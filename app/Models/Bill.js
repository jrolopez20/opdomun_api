'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const HisPost = use('App/Models/HisPost')
const Post = use('App/Models/Post')
const Database = use('Database')
const Config = use('App/Models/Config');
const User = use('App/Models/User');

const RENOVADOS_PRICE = 5.0;
const TASACION_PRICE = 20.0;
const DESCUENTO = 0.45;
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Noviembre', 'Diciembre'];

class Bill extends Model {

  static async getUsersWithActivity(year, month) {
    const users = await Database
      .table('users')
      .select('users.id', 'users.opnum')
      .distinct('users.id')
      .innerJoin('posts', 'users.id', 'posts.user_id')
      .innerJoin('his_posts', 'posts.id', 'his_posts.post_id')
      .whereRaw('month(his_posts.created_at) = ? and year(his_posts.created_at) = ?', [month, year])

    return users;
  }

  static async generateBills(year, month) {
    const trx = await Database.beginTransaction()
    try {
      const users = await this.getUsersWithActivity(year, month)

      for (let user of users) {
        // const statistics = await HisPost.getStatisticsByUser(user.id)
        const statistics = await HisPost.getStatisticsByUser2(user.id, month, year)

        let total = 0;
        if (statistics.publicados) {
          for (const item of statistics.publicados) {
            total += item.total * item.price;
          }
        }
        if (statistics.renovados > 0) {
          total += statistics.renovados * RENOVADOS_PRICE;
        }
        if (statistics.tasacion > 0) {
          total += statistics.tasacion * TASACION_PRICE;
        }

        const subtotal = parseFloat(total - (total * DESCUENTO));

        //Registra la factura
        const bill = new Bill()
        bill.num = user.opnum + '/' + year + month;
        bill.user_id = user.id;
        bill.month = month;
        bill.year = year;
        bill.amount = subtotal;
        await bill.save(trx);
      }
      await trx.commit();

      return users.length;
    } catch (e) {
      trx.rollback();
      throw e
    }
  }

  static async getBillContent(userId, year, month, billNumber = null) {
    const config = await Config.firstOrFail()
    const statistics = await HisPost.getStatisticsByUser2(userId, month, year);

    const user = await User.find(userId)
    const periodo = months[month - 1] + ' / ' + year
    billNumber = billNumber ? billNumber : '-'

    try {
      let content = [
        // === Header ===
        {
          absolutePosition: {x: 0, y: 0},
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#efeeee',
              color: '#efeeee',
              points: [{x: 0, y: 0}, {x: 600, y: 0}, {x: 600, y: 90}, {x: 0, y: 90}]
            }
          ]
        },
        {
          absolutePosition: {x: 0, y: 0},
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#1070af',
              color: '#1070af',
              points: [{x: 323, y: 0}, {x: 343, y: 0}, {x: 293, y: 90}, {x: 273, y: 90}]
            }
          ]
        },
        {
          absolutePosition: {x: 0, y: 0},
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#1070af',
              color: '#1070af',
              points: [{x: 350, y: 0}, {x: 600, y: 0}, {x: 600, y: 90}, {x: 300, y: 90}]
            }
          ]
        },
        {
          image: 'public/images/logo_blue.png',
          width: 30,
          margin: [0, -10, 0, 0]
        },
        {
          absolutePosition: {x: 75, y: 30},
          text: 'opdomun',
          fontSize: 28,
          bold: true,
          color: '#1070af'
        },
        {
          absolutePosition: {x: 370, y: 34},
          text: (billNumber == '-' ? 'PREFACTURA' : 'FACTURA'),
          fontSize: 28,
          bold: true
        },
        {
          absolutePosition: {x: 370, y: 64},
          text: 'Periodo: ' + periodo,
          fontSize: 9,
          color: '#ffffff'
        },
        {
          absolutePosition: {x: 370, y: 74},
          text: 'No: ' + billNumber,
          fontSize: 9,
          color: '#ffffff'
        },
        // === End Header ===

        {
          margin: [0, 80, 0, 60],
          layout: {
            defaultBorder: false,
            hLineColor: '#b4b4b4'
          },
          table: {
            layout: {
              defaultBorder: false
            },
            body: [
              [
                {
                  text: 'EMISOR:',
                  bold: true,
                  fontSize: 13
                },
                {
                  text: 'OPDOMUN',
                  fontSize: 13
                }
              ],
              [
                {
                  text: 'RECEPTOR:',
                  bold: true,
                  fontSize: 13
                },
                {
                  text: user.fullname.toUpperCase(),
                  fontSize: 13
                }
              ],
              ['', {
                text: 'Especialista OPDOMUN #OP-' + user.opnum,
                fontSize: 11
              }],
              ['', {
                text: 'CI: ' + user.numid,
                fontSize: 11
              }],
              ['', {
                text: 'Dirección: ' + user.address,
                fontSize: 11
              }]
            ]
          }
        },

        {
          layout: {
            defaultBorder: false,
            hLineColor: '#b4b4b4'
          },
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 70, 70, 70],
            body: [
              [
                {text: 'No.', border: [false, true, false, true], color: '#1070af'},
                {text: 'DESCRIPCIÓN', border: [false, true, false, true], color: '#1070af'},
                {text: 'UM', border: [false, true, false, true], alignment: 'center', color: '#1070af'},
                {
                  text: 'CANTIDAD',
                  border: [false, true, false, true],
                  alignment: 'right',
                  color: '#1070af'
                },
                {
                  text: 'PRECIO',
                  border: [false, true, false, true],
                  alignment: 'right',
                  color: '#1070af'
                },
                {
                  text: 'IMPORTE',
                  border: [false, true, false, true],
                  alignment: 'right',
                  color: '#1070af'
                }
              ]
            ]
          }
        },

        {
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#d69049',
              color: '#d69049',
              points: [{x: 310, y: 30}, {x: 570, y: 30}, {x: 570, y: 80}, {x: 260, y: 80}]
            }
          ]
        },

        {
          text: 'TOTAL A PAGAR: {0} CUC',
          fontSize: 13,
          alignment: 'right',
          margin: [0, -30, 0, 0]
        },

        {
          text: 'Información del pago:',
          bold: true,
          fontSize: 13,
          margin: [0, 30, 0, 5],
          fontFamily: "Arial"
        },
        {
          text: 'Cuenta bancaria: ' + config.bankaccount,
          margin: [0, 2], fontSize: 11
        },
        {
          text: 'Banco: ' + config.bankname,
          margin: [0, 2], fontSize: 11
        },
        {
          text: 'Nombre: ' + config.owneraccount,
          margin: [0, 2, 0, 40], fontSize: 11
        },
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 140,
              h: 2,
              color: '#282828',
            }
          ]
        },

        {
          text: 'Términos y condiciones',
          bold: true,
          fontSize: 13,
          margin: [0, 20, 0, 5]
        },
        {
          text: 'Esta Factura vence 10 días después \n de la fecha de emisión.',
          fontSize: 11,
          margin: [0, 2]
        },

        {
          absolutePosition: {x: 480, y: 680},
          qr: 'https://opdomun.com',
          fit: 90
        },

        {
          absolutePosition: {x: 0, y: 792},
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#efeeee',
              color: '#efeeee',
              points: [{x: 0, y: 0}, {x: 600, y: 0}, {x: 600, y: 50}, {x: 0, y: 50}]
            }
          ]
        },
        {
          absolutePosition: {x: 0, y: 792},
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#1070af',
              color: '#1070af',
              points: [{x: 323, y: 0}, {x: 363, y: 0}, {x: 323, y: 50}, {x: 283, y: 50}]
            }
          ]
        },
        {
          absolutePosition: {x: 0, y: 792},
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#1070af',
              color: '#1070af',
              points: [{x: 373, y: 0}, {x: 600, y: 0}, {x: 600, y: 50}, {x: 333, y: 50}]
            }
          ]
        }, {
          absolutePosition: {x: 0, y: 812},
          canvas: [
            {
              type: 'polyline',
              lineWidth: 1,
              closePath: true,
              hLineColor: '#282828',
              color: '#282828',
              points: [{x: 0, y: 0}, {x: 280, y: 0}, {x: 256, y: 30}, {x: 0, y: 30}]
            }
          ]
        }
      ];

      let row = [];
      let i = 0;
      let total = 0;
      let importe = 0;
      if (statistics.publicados) {
        for (const item of statistics.publicados) {
          importe = item.total * item.price;
          total += importe;
          content[9].table.body.push([++i,
            item.title,
            {
              text: 'u',
              alignment: 'center'
            },
            {
              text: item.total,
              alignment: 'right'
            },
            {
              text: item.price,
              alignment: 'right'
            },
            {
              text: importe,
              alignment: 'right'
            }
          ]);
        }
      }
      if (statistics.renovados > 0) {
        importe = statistics.renovados * RENOVADOS_PRICE;
        total += importe;
        content[9].table.body.push([++i,
          'RENOVADOS',
          {
            text: 'u',
            alignment: 'center'
          },
          {
            text: statistics.renovados,
            alignment: 'right'
          },
          {
            text: RENOVADOS_PRICE,
            alignment: 'right'
          },
          {
            text: importe,
            alignment: 'right'
          }
        ]);
      }
      if (statistics.tasacion > 0) {
        importe = statistics.tasacion * TASACION_PRICE;
        total += importe;
        content[9].table.body.push([++i,
          'TASACIÓN',
          {
            text: 'u',
            alignment: 'center'
          },
          {
            text: statistics.tasacion,
            alignment: 'right'
          },
          {
            text: TASACION_PRICE,
            alignment: 'right'
          },
          {
            text: importe,
            alignment: 'right'
          }
        ]);
      }

      const montoDescuento = parseFloat(total * DESCUENTO);
      const subtotal = parseFloat(total - montoDescuento);
      row = [
        {
          text: 'TOTAL:',
          colSpan: 5,
          color: '#1070af',
          alignment: 'right',
          border: [false, true, false, false]
        },
        '',
        '',
        '',
        '',
        {
          text: total,
          alignment: 'right',
          border: [false, true, false, false]
        }
      ];
      content[9].table.body.push(row);
      row = [
        {
          text: 'Descuento 45%:',
          colSpan: 5,
          alignment: 'right'
        },
        '',
        '',
        '',
        '',
        {
          text: montoDescuento,
          alignment: 'right'
        }
      ];
      content[9].table.body.push(row);
      row = [
        {
          text: 'SUBTOTAL:',
          colSpan: 5,
          color: '#1070af',
          alignment: 'right',
        },
        '',
        '',
        '',
        '',
        {
          text: subtotal,
          alignment: 'right'
        }
      ];
      content[9].table.body.push(row);
      content[11].text = 'TOTAL A PAGAR: ' + subtotal + ' CUC';

      return content
    } catch (e) {
      throw e
    }
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

}

module.exports = Bill
