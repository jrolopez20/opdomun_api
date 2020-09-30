﻿/**
* Initianlization script
*
* 1- Provincias
* 2- Municipios
* 3- Localidades
* 4- Variables
* 5- Home_types
* 6- Plans
* 7- Nom_electrodomesticos
* 8- Nom_moviliarios
* 9- Nom_seg_ciudadanas
*
*/

/* 1- Data for the `provincias` table  (Records 1 - 16) */

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (1, 'PR', 'Pinar del rio');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (2, 'ART', 'Artemisa');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (3, 'HAB', 'La Habana');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (4, 'MAB', 'Mayabeque');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (5, 'MTZ', 'Matanzas');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (6, 'CF', 'Cienfuegos');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (7, 'VC', 'Villa Clara');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (8, 'SS', 'Sancti Spiritus');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (9, 'CA', 'Ciego de Ávila');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (10, 'LT', 'Las Tunas');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (11, 'CMG', 'Camaguey');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (12, 'HG', 'Holguín');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (13, 'GR', 'Granma');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (14, 'SC', 'Santiago de Cuba');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (15, 'GTMO', 'Guantánamo');

INSERT INTO "provincias" ("id", "cod", "title")
VALUES (16, 'IJ', 'Isla de la Juventud');


/* 2- Data for the `municipios` table  (Records 1 - 168) */

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (1, 1, 'Sandino', 13.56);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (2, 1, 'Mantua', 8.89);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (3, 1, 'Minas de Matahambre', 11.64);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (4, 1, 'Viñales', 10.42);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (5, 1, 'La Palma', 12.43);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (6, 1, 'Los Palacios', 14.24);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (7, 1, 'Consolación del Sur', 31.69);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (8, 1, 'Pinar del Río', 68.29);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (9, 1, 'San Luis', 11.87);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (10, 1, 'San Juan y Martínez', 15.69);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (11, 1, 'Guane', 13.16);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (12, 2, 'Bahía Honda', 60.04);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (13, 2, 'Mariel', 63.11);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (14, 2, 'Guanajay', 38.97);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (15, 2, 'Caimito', 58.42);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (16, 2, 'Bauta', 70.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (17, 2, 'San Antonio de los Baños', 72.02);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (18, 2, 'Güira de Melena', 56.03);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (19, 2, 'Alquizar', 46.94);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (20, 2, 'Artemisa', 119.04);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (21, 2, 'Candelaria', 29.25);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (22, 2, 'San Cristóbal', 98.83);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (23, 3, 'Playa', 426.77);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (24, 3, 'Plaza de la Revolución', 372.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (25, 3, 'Centro Habana', 372.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (26, 3, 'Habana Vieja', 372.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (27, 3, 'Regla', 372.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (28, 3, 'Habana del Este', 457.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (29, 3, 'Guanabacoa', 426.77);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (30, 3, 'San Miguel del Padrón', 457.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (31, 3, 'Diez de Octubre', 457.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (32, 3, 'Cerro', 372.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (33, 3, 'Marianao', 426.77);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (34, 3, 'La Lisa', 426.77);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (35, 3, 'Boyeros', 426.77);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (36, 3, 'Arroyo Naranjo', 457.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (37, 3, 'Cotorro', 457.55);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (49, 4, 'Bejucal', 10.08);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (50, 4, 'San José de las Lajas', 27.41);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (51, 4, 'Jaruco', 8.6);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (52, 4, 'Santa Cruz del Norte', 12.42);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (53, 4, 'Madruga', 8.57);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (54, 4, 'Nueva Paz', 8.58);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (55, 4, 'San Nicolás', 7.47);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (56, 4, 'Güines', 23.27);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (57, 4, 'Melena del Sur', 7.35);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (58, 4, 'Batabanó', 9.76);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (59, 4, 'Quivicán', 10.68);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (60, 5, 'Matanzas', 77.22);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (61, 5, 'Cárdenas', 76.41);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (62, 5, 'Martí', 10.84);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (63, 5, 'Colón', 33);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (64, 5, 'Perico', 14.92);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (65, 5, 'Jovellanos', 27.77);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (66, 5, 'Pedro Betancourt', 14.44);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (67, 5, 'Limonar', 16.98);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (68, 5, 'Unión de Reyes', 5.03);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (69, 5, 'Ciénaga de Zapata', 29.29);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (70, 5, 'Jagüey Grande', 13.47);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (71, 5, 'Calimete', 11.53);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (72, 5, 'Los Arabos', 14.49);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (73, 7, 'Corralillo', 13.62);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (74, 7, 'Quemado de Güines', 11.24);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (75, 7, 'Sagua la Grande', 26.88);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (76, 7, 'Encrucijada', 17.01);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (77, 7, 'Camajuaní', 30.99);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (78, 7, 'Caibarién', 21.58);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (79, 7, 'Remedios', 23.29);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (80, 7, 'Placetas', 34.29);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (81, 7, 'Santa Clara', 127.71);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (82, 7, 'Cifuentes', 14.15);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (83, 7, 'Santo Domingo', 25.87);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (84, 7, 'Ranchuelo', 27.74);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (85, 7, 'Manicaragua', 34.15);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (86, 6, 'Aguada de Pasajeros', 13.47);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (87, 6, 'Rodas', 14.62);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (88, 6, 'Palmira', 14.07);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (89, 6, 'Lajas', 9.2);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (90, 6, 'Cruces', 12.73);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (91, 6, 'Cumanayagua', 20.85);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (92, 6, 'Cienfuegos', 77.42);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (93, 6, 'Abreus', 13.32);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (94, 8, 'Yaguajay', 25.59);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (95, 8, 'Jatibonico', 20.06);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (96, 8, 'Taguasco', 15.92);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (97, 8, 'Cabaiguán', 30.08);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (98, 8, 'Fomento', 14.9);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (99, 8, 'Trinidad', 36.34);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (100, 8, 'Sancti Spíritus', 66.38);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (101, 8, 'La Sierpe', 8.1);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (102, 9, 'Chambas', 15.62);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (103, 9, 'Morón', 28.84);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (104, 9, 'Bolivia', 6.53);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (105, 9, '1ro de Enero', 9.68);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (106, 9, 'Ciro Redondo', 12.73);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (107, 9, 'Florencia', 7.98);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (108, 9, 'Majagua', 10.66);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (109, 9, 'Ciego de Avila', 64.04);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (110, 9, 'Venezuela', 11.02);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (111, 9, 'Baraguá', 13.6);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (112, 11, 'Carlos M. de Céspedes', 5.78);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (113, 11, 'Esmeralda', 7.11);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (114, 11, 'Sierra de Cubitas', 4.57);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (115, 11, 'Minas', 8.89);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (116, 11, 'Nuevitas', 14.74);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (117, 11, 'Guáimaro', 8.83);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (118, 11, 'Sibanicú', 7.24);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (119, 11, 'Camagüey', 76.73);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (120, 11, 'Florida', 16.88);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (121, 11, 'Vertientes', 12.14);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (122, 11, 'Jimaguayú', 4.99);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (123, 11, 'Najasa', 3.78);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (124, 11, 'Santa Cruz del Sur', 10.42);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (125, 10, 'Manatí', 9.51);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (126, 10, 'Puerto Padre', 28.91);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (127, 10, 'Jesús Menéndez', 15.34);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (128, 10, 'Majibacoa', 13.23);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (129, 10, 'Las Tunas', 66.32);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (130, 10, 'Jobabo', 13.67);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (131, 10, 'Colombia', 10.37);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (132, 10, 'Amancio', 12.3);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (133, 12, 'Gibara', 23.05);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (134, 12, 'Rafael Freire', 18.01);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (135, 12, 'Banes', 25.81);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (136, 12, 'Antillas', 4.11);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (137, 12, 'Báguanos', 15.89);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (138, 12, 'Holguín', 116.02);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (139, 12, 'Calixto García', 17.84);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (140, 12, 'Cacocúm', 13.32);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (141, 12, 'Urbano Noris', 13.06);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (142, 12, 'Cueto', 10.51);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (143, 12, 'Mayarí', 32.02);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (144, 12, 'Frank País', 7.76);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (145, 12, 'Sagua de Tánamo', 15.17);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (146, 12, 'Moa', 25.28);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (147, 13, 'Río Cauto', 15.13);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (148, 13, 'Cauto Cristo', 6.54);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (149, 13, 'Jiguaní', 18.93);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (150, 13, 'Bayamo', 75.95);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (151, 13, 'Yara', 18.18);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (152, 13, 'Manzanillo', 40.37);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (153, 13, 'Campechuela', 13.86);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (154, 13, 'Media Luna', 10.53);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (155, 13, 'Niquero', 13.39);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (156, 13, 'Pilón', 9.37);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (157, 13, 'Bartolome Masó', 15.6);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (158, 13, 'Buey Arriba', 9.94);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (159, 13, 'Guisa', 14.89);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (160, 14, 'Contramaestre', 31.46);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (161, 14, 'Mella', 10.54);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (162, 14, 'San Luis', 23.51);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (163, 14, 'Segundo Frente', 11.84);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (164, 14, 'Songo - La Maya', 27.52);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (165, 14, 'Santiago de Cuba', 150.39);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (166, 14, 'Palma Soriano', 36.11);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (167, 14, 'Tercer Frente', 9.19);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (168, 14, 'Guamá', 10.2);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (169, 15, 'El Salvador', 29.45);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (170, 15, 'Manuel Tames', 26.3);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (171, 15, 'Yateras', 13.4);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (172, 15, 'Baracoa', 54.96);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (173, 15, 'Maisí', 19.47);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (174, 15, 'Imias', 14.51);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (175, 15, 'San Antonio del Sur', 17.44);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (176, 15, 'Caimanera', 7.89);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (177, 15, 'Guantánamo', 156.07);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (178, 15, 'Niceto Pérez', 11.57);

INSERT INTO "municipios" ("id", "provincia_id", "title", "prosp_urbana")
VALUES (179, 16, 'Isla de la Juventud', 33.71);


/* 3- Data for the `localidads` table  (Records 1 - 1502) */

INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (91, 9, 'Las Palizadas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (90, 9, 'El Retiro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (85, 9, 'Santa Fe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1348, 162, 'La luz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1343, 162, 'Nuevo Mundo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1332, 162, 'Dos Caminos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1334, 162, 'Capitán San Luis');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1335, 162, 'José Martí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1400, 164, 'Salvador Rosales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1339, 162, 'Pedernal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (44, 2, 'Pino Gordo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (45, 2, 'Los Arroyos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (46, 2, 'El Roble');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (47, 2, 'La Ceja');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (48, 2, 'Dimas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (49, 2, 'Macurije');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (50, 3, 'Santa Lucia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (51, 3, 'La Sabana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (52, 3, 'Minas de Matahambre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (53, 3, 'Pons');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (54, 3, 'Cabeza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (55, 3, 'Sumidero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (56, 3, 'San Carlos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (57, 8, 'Jagüey Cuyují');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (58, 8, 'Celso Maragoto Lara');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (59, 8, '10 de Octubre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (60, 8, 'Hermanos Cruz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (61, 8, 'Capitán San Luis');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (62, 8, 'Cuba Libre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (63, 8, 'Hermanos Barcón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (64, 8, 'Carlos Manuel');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (65, 8, 'Ceferino Fernández Viña');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (66, 8, 'San Vicente');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (67, 8, 'La Guabina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (68, 8, 'Aguas Claras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (69, 8, 'La Conchita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (70, 8, 'El Vizcaíno');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (71, 8, 'Las Taironas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (72, 8, 'Las Ovas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (73, 8, 'Briones Montoto');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (74, 8, 'La Coloma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (75, 10, 'Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (76, 10, 'Vivero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (77, 10, 'Hermanos Saíz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (78, 10, 'Punta de Cartas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (79, 10, 'Galope');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (80, 10, 'Boca de Galafre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (81, 10, 'Campo Hermoso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (82, 10, 'El Cafetal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (83, 10, 'Río Seco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (92, 1, 'Martí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (93, 1, 'Cortés');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (94, 1, 'Pasada de Marín');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (95, 1, 'Las Martinas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (96, 1, 'Manuel Lazo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (97, 1, 'Guanahacabibes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (98, 1, 'Sandino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (99, 1, 'Bolivar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (100, 4, 'Viñales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (101, 4, 'Puerto Esperanza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (102, 4, 'El Moncada');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (103, 4, 'San Vicente');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (104, 4, 'República de Chile');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (105, 4, 'Playuela');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (106, 4, 'Los Jazmines');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (107, 19, 'Mayorquín - Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (108, 19, 'Pulido - Guanímar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (109, 19, 'Dagame');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (110, 19, 'Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (111, 20, 'Cayajabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (112, 20, 'Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (113, 20, 'Corojal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (114, 20, 'La Matilde');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (115, 20, 'Las Cañas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (116, 20, 'Lavandero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (117, 20, 'Lincoln');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (118, 20, 'Reparto Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (119, 20, 'Toledo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (120, 16, 'Anafe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (121, 16, 'Baracoa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (122, 16, 'Cangrejeras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (123, 16, 'Corralillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (124, 15, 'Costa Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (125, 15, 'Vereda Nueva');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (126, 15, 'Ceiba del Agua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1389, 164, 'Maya Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (762, 105, 'Pablo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (787, 112, ' Piedrecitas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (824, 119, 'Buenos Aires - Bella Vista');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (817, 119, 'Vista Hermosa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (836, 122, 'Bidot');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (979, 137, 'Unión 6');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1005, 140, 'Cristino Naranjo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1310, 161, 'Pinalito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1252, 157, 'Las Vegas de Jibacoa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1241, 157, 'Río Yara');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1123, 134, 'Carlos Noris');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (543, 76, 'La Sierra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (547, 85, 'La Moza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (626, 81, 'Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1074, 138, 'Yareyal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (42, 2, 'Montezuelo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (43, 2, 'Mantua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1423, 172, 'Jamal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (127, 15, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (128, 15, 'Caimito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (129, 14, 'Consejo Popular 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (130, 14, 'Consejo Popular 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (131, 14, 'Consejo Popular 3');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (132, 17, 'Este Rural');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (133, 17, 'Este Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (134, 17, 'Oeste Rural');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (135, 17, 'Oeste Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (136, 17, 'Centro Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (137, 13, 'Boca - Mojica - Henequé');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (138, 13, 'Mariel');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (139, 13, 'Zaya - Sabana - Ingénito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (140, 13, 'Quiebra Hacha');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (141, 13, 'Cabañas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (142, 18, 'Vivian Alonso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (143, 18, 'Niceto Pérez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (144, 18, 'Ubaldo Díaz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (145, 18, 'Cajio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (146, 18, 'Gabriel');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (147, 18, 'Junco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (148, 12, 'Bahía Honda Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (149, 12, 'Bahía Honda Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (150, 12, 'Harlem');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (151, 12, 'Las Pozas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (152, 12, 'Silvio Caro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (153, 12, 'El Morrillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (154, 12, 'San Diego de Núñez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (155, 12, 'Pablo de la Torriente Brau');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (156, 12, 'Luis Carrasco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (157, 12, 'Blanca Arena');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (158, 21, 'Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (159, 21, 'Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (160, 21, 'Montaña');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (161, 21, 'Pre-Montaña');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (162, 22, 'Niceto Pérez.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (163, 22, 'Ciro Redondo.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (164, 22, 'Fierro.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (165, 22, 'Santa Cruz de los Pinos.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (166, 22, 'Los Pinos.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (167, 22, 'Mango Jobo.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (168, 22, 'San Cristóbal 2.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (169, 22, 'Río Hondo.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (170, 22, 'José Martí.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (171, 22, 'San Cristóbal 1.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (172, 22, 'López Peña.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (173, 22, 'Taco Taco.');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (174, 49, 'La Musicanga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (175, 49, 'Los Malayos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (176, 49, 'Río Hondo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (177, 49, 'Buenaventura');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (178, 56, 'Catalina de Güines');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (179, 56, 'El Cangre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (180, 56, 'Río Seco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (181, 56, 'Amistad con los pueblos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (182, 56, 'Osvaldo Sánchez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (183, 56, 'Loma de Candela');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (184, 51, 'Jaruco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (185, 51, 'Bainoa - Casiguas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (186, 51, 'San Antonio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (187, 51, 'Caraballo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (188, 51, 'Tumba Cuatro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (189, 53, 'Rubén Martínez Villena');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (190, 53, 'Boris Luis Santa Coloma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (191, 53, 'Madruga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (192, 53, 'Pipián');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (193, 53, 'Flor de Itabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (194, 53, 'Aguacate');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (195, 57, 'Melena del Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (196, 57, 'Lechuga - Monte - Zapote');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (197, 57, 'Guara');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (198, 57, 'Mañalich');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (199, 54, 'Los Palos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (200, 54, 'Vegas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (201, 54, 'CAI Manuel Isla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (202, 54, 'El Sureste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (203, 50, 'Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (204, 50, 'Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (89, 9, 'El Corojo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (88, 9, 'Buena Vista');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (87, 9, 'Santa María');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (86, 9, 'Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (205, 50, 'Tapaste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (206, 50, 'Jamaica');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (207, 50, 'Zaragoza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (208, 50, 'San Antonio de las Vegas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (292, 26, 'San Isidro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (209, 55, 'Domingo Quintero Dávila (Norte)');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (210, 55, 'José Luis García Lima (Sur)');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (211, 55, 'Héctor Molina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (212, 55, 'Pedrín Troya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (213, 59, 'La Salud');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (214, 59, 'Quivicán');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (215, 59, 'Central Noriega');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (216, 59, 'San Felipe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (217, 58, 'Batabanó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (218, 58, 'Surgidero de Batabanó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (219, 58, 'Camacho');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (220, 58, 'Pozo Redondo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (221, 58, 'La Julia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (222, 52, 'Boca de Jaruco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (223, 52, 'Jibacoa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (224, 52, 'Central Camilo Cienfuegos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (225, 52, 'Bacunayagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (226, 52, 'Comino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (227, 36, 'Los Pinos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (228, 36, 'Poey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (229, 36, 'Víbora Park');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (230, 36, 'Mantilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (231, 36, 'Párraga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (232, 36, 'Calvario');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (233, 36, 'Güinera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (234, 36, 'Eléctrico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (235, 36, 'Managua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (236, 36, 'Callejas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (237, 35, 'Armada - Aldabó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (238, 35, 'Altahabana - Capdevila');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (239, 35, 'Wajay');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (240, 35, 'Rancho Boyeros');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (241, 35, 'Calabazar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (242, 35, 'Santiago de las Vegas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (243, 35, 'Nuevo Santiago');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (244, 25, 'Cayo Hueso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (245, 25, 'Dragones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (246, 25, 'Colón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (247, 25, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (248, 25, 'Los Sitios');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (249, 32, 'Latinoamericano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (250, 32, 'Pilar - Atarés');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (251, 32, 'Cerro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (252, 32, 'Las Cañas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (253, 32, 'El Canal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (254, 32, 'Palatino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (255, 32, 'Armada');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (256, 37, 'San Pedro – Centro Cotorro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (257, 37, 'Santa María del Rosario');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (258, 37, 'Lotería');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (259, 37, 'Cuatro Caminos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (260, 37, 'Magdalena – Torriente');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (261, 37, 'Alberro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (262, 31, 'Luyanó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (263, 31, 'Tamarindo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (264, 31, 'Jesús del Monte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (265, 31, 'Santos Suárez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (266, 31, 'Víbora');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (267, 31, 'Acosta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (268, 31, 'Sevillano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (269, 31, 'Lawton');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (270, 31, 'Vista Alegre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (271, 29, 'Chibás - Roble');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (272, 29, 'Villa I');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (273, 29, 'Villa II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (274, 29, 'La Jata - Naranjo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (275, 29, 'Mañana - Habana Nueva');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (276, 29, 'DBeche - Nalón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (277, 29, 'Minas - Barreras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (278, 29, 'Peñalver - Bacuranao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (279, 28, 'Camilo Cienfuegos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (280, 28, 'Cojímar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (281, 28, 'Antonio Guiteras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (282, 28, 'Alamar Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (283, 28, 'Alturas de Alamar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (284, 28, 'Guanabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (285, 28, 'Campo Florido');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (286, 28, 'Alamar - Playa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (287, 26, 'Prado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (288, 26, 'Catedral');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (289, 26, 'Plaza Vieja');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (290, 26, 'Belén');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (291, 26, 'Jesús María');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (293, 26, 'Tallapiedra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (294, 34, 'Versalles - Coronela');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (295, 34, 'San Agustín');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (296, 34, 'Balcón Arimao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (297, 34, 'Alturas de La Lisa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (298, 34, 'Arroyo Arenas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (299, 34, 'El Cano - Valle Grande - Bello 26 y Morado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (300, 34, 'Punta Brava');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (301, 33, 'Libertad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (302, 33, 'Zamora - Coco Solo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (303, 33, 'Belén - Finlay - Pogolotti');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (304, 33, 'Pocito - Palmar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (305, 33, 'CAI - Los Angeles');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (306, 33, 'Santa Felicia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (307, 23, 'Santa Fe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (308, 23, 'Jaimanitas - Siboney');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (309, 23, 'Cubanacán - Náutico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (310, 23, 'Ampliación Almendares');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (312, 23, 'La Ceiba - Kholy');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (313, 23, 'Sierra - Almendares');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (314, 23, 'Buenavista');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (315, 24, 'Colón - Nuevo Vedado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (316, 24, 'Vedado - Malecón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (317, 24, 'Rampa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (318, 24, 'Plaza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (319, 24, 'Nuevo Vedado - Puentes Grandes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (320, 24, 'El Carmelo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (321, 24, 'Príncipe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (322, 27, 'Casablanca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (323, 27, 'Guaicanamar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (324, 27, 'Loma - Modelo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (325, 30, 'Rocafort');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (326, 30, 'Luyanó Moderno');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (327, 30, 'Diezmero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (328, 30, 'San Francisco de Paula');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (329, 30, 'Dolores - Veracruz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (330, 30, 'Jacomino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (331, 71, 'Calimete');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (332, 71, 'Amarillas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (333, 71, 'Céspedes - Jesús Rabí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (334, 71, '6 de Agosto');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (335, 71, 'Reynold García');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (336, 71, 'Manguito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (337, 61, 'Pueblo Nuevo Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (338, 61, 'Pueblo Nuevo Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (339, 61, 'Versalles');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (340, 61, 'Marina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (341, 61, 'Fundición');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (342, 61, 'Fructuoso Rodríguez - 13 de marzo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (343, 61, 'Cantel - Camarioca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (344, 61, 'Guásimas - Humberto Álvarez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (345, 61, 'Central José Smith Comas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (346, 61, 'Lagunillas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (347, 61, 'Península');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (348, 61, 'Santa Marta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (349, 61, 'Boca de Camarioca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (350, 69, 'Playa Larga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (351, 69, 'Playa Girón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (352, 69, 'Cayo Ramona');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (353, 63, 'Banagüises');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (354, 63, 'San José de los Ramos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (355, 63, 'Central Méjico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (356, 63, 'Zona Industrial');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (357, 63, 'Guareiras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (358, 63, 'Central Rene Fraga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (359, 63, 'Colón Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (360, 63, 'Central Sergio González');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (361, 63, 'Colón Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (362, 63, 'Colón Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (363, 70, 'Jagüey Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (364, 70, 'Jagüey Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (365, 70, 'Agramonte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (366, 70, 'Australia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (367, 70, 'San José de Marcos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (368, 70, 'Torriente');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (369, 65, 'Luisa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (370, 65, 'Horacio Rodríguez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (371, 65, 'San Carlos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (372, 65, 'Flor Crombet');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (373, 65, 'Julio Reyes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (374, 65, 'La Carlota');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (375, 65, 'La Isabel');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (376, 65, 'Carlos Rojas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (377, 65, 'Granma - Yaguajay');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (378, 65, 'Coliseo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (379, 65, 'San Miguel de los Baños');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (380, 65, 'Jaime López');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (381, 67, 'Limonar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (382, 67, 'Triunvirato');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (383, 67, 'San Francisco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (384, 67, 'Central Horacio Rodríguez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (385, 67, 'Santa Ana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (386, 67, 'Central Fructuoso Rodríguez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (387, 72, 'Los Arabos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (388, 72, 'San Pedro de Mayabón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (389, 72, 'Macagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (390, 72, 'Israel Ruiz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (391, 72, 'Zorrilla – Cuatro Esquinas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (392, 62, 'Martí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (393, 62, 'Central Esteban Hernández');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (394, 62, 'Itabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (395, 62, 'Carlos Rodríguez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (396, 62, 'Hoyo Colorado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (397, 62, '28 de Octubre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (398, 60, 'Versalles');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (399, 60, 'Matanzas Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (400, 60, 'Matanzas Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (401, 60, 'Naranjal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (402, 60, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (404, 60, 'Peñas Altas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (405, 60, 'Guanábana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (406, 60, 'Ceiba Mocha');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (407, 60, 'El Valle');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (408, 66, 'Manuelito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (409, 66, 'Bolondrón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (410, 66, 'Güira de Macurijes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (411, 66, 'Navajas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (412, 66, 'Pedro Betancourt');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (413, 66, 'Pedroso - Socorro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (414, 64, 'Perico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (415, 64, 'España Republicana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (416, 64, 'Máximo Gómez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (417, 68, 'Unión de Reyes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (418, 68, 'Juan Gualberto Gómez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (419, 68, 'Cidra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (420, 68, 'Alacranes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (421, 68, 'Bermejas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (422, 68, 'San Antonio de Cabezas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (423, 68, 'Puerto Rico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (424, 68, 'Juan Ávila');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (425, 68, 'Estante');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (426, 92, 'Reina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (427, 92, 'Centro Histórico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (428, 92, 'Pastorita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (429, 92, 'Junco Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (430, 92, 'La Juanita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (431, 92, 'Juanita II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (432, 92, 'Pueblo Griffo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (433, 92, 'Caonao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (434, 92, 'La Gloria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (435, 92, 'Tulipán');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (436, 92, 'La Barrera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (437, 92, 'Buenavista');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (438, 92, 'San Lázaro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (439, 92, 'Paraíso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (440, 92, 'Rancho Luna');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (441, 92, 'Punta Gorda');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (442, 92, 'Guaos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (443, 92, 'Pepito Tey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (444, 92, 'Castillo CEN');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (445, 93, 'Abreus');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (446, 93, 'Constancia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (447, 93, 'Charcas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (449, 93, 'Cieneguitas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (450, 93, 'Yaguaramas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (451, 93, 'Horquita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (452, 86, 'María Victoria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (453, 86, 'Federal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (454, 86, '1ro de Mayo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (486, 89, 'Lajas Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (487, 89, 'Lajas Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (455, 86, 'Real Campiña');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (456, 86, 'Managuaco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (457, 86, 'La Torula');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (458, 86, 'La Libertad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (459, 90, 'Isla Pino - La Trocha');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (460, 90, 'Las Nubes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (461, 90, 'Potrerillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (462, 90, 'Paradero de Camarones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (463, 90, 'Mal Tiempo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (464, 90, 'Marta Abreu');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (465, 90, 'San José');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (466, 90, 'Chicharrones - El No');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (467, 91, 'Sierrita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (468, 91, 'Breñas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (469, 91, 'Crespo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (470, 91, 'Barajagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (471, 91, 'Crucesitas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (472, 91, 'Camilo Cienfuegos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (473, 91, 'Arimao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (474, 91, 'Sopapo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (475, 91, 'Cuatro Vientos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (476, 91, 'Napoleón Diego');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (477, 91, 'Rafelito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (478, 91, 'Las Brisas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (479, 91, 'Las Moscas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (480, 88, 'Palmira Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (481, 88, 'Palmira Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (482, 88, 'Arriete - Ciego Montero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (483, 88, 'Espartaco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (484, 88, 'Elpidio Gómez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (485, 88, 'San Fernando de Camarones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (493, 87, 'Rodas 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (494, 87, 'Rodas 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (495, 87, 'Cartagena');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (496, 87, 'Congojas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (497, 87, 'Ariza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (498, 87, '14 de Julio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (499, 87, '5 de Septiembre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (500, 87, 'Santiago de Cartagena');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (501, 87, 'Medidas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (502, 78, 'Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (503, 78, 'Punta Brava');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (504, 78, 'Van Troi');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (505, 78, 'Marcelo Salado Lastra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (506, 78, 'Dolores');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (507, 77, 'Camajuaní I');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (508, 77, 'Camajuaní II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (509, 77, 'San Antonio de las Vueltas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (510, 77, 'Aguada de Moya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (511, 77, 'Batalla de Santa Clara');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (512, 77, 'Sagua la Chica');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (513, 77, 'Vega Alta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (514, 77, 'Taguayabón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (515, 77, 'José María Pérez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (516, 77, 'Sabana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (517, 77, 'Luis Arcos Bergnes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (518, 77, 'Vega de Palma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (519, 77, 'La Quinta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (520, 82, 'Cifuentes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (521, 82, 'San Diego');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (522, 82, 'Unidad Proletaria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (523, 82, 'Mariana Grajales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (524, 82, 'Wilfredo Pagés');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (525, 82, 'Braulio Coroneaux');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (526, 82, 'El Vaquerito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (527, 82, 'Mata');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (528, 73, 'Corralillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (529, 73, 'Guillermo Llabre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (530, 73, 'La Panchita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (531, 73, 'Quintin Banderas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (532, 73, 'Rancho Veloz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (533, 73, 'Sierra Morena');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (534, 73, 'Motembo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (535, 73, 'Gavilanes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (536, 76, 'Encrucijada Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (537, 76, 'Encrucijada Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (488, 89, 'Ajuria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (489, 89, 'Barrio Piragua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (490, 89, 'La Modelo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (491, 89, 'Caracas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (492, 89, 'Ramón Balboa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (538, 76, 'Calabazar de Sagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (539, 76, 'El Santo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (540, 76, 'Emilio Córdova');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (541, 76, 'Perucho Figueredo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (542, 76, 'Abel Santamaría');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (544, 85, 'Manicaragua I');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (545, 85, 'Manicaragua II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (546, 85, 'Manicaragua III');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (548, 85, 'La Campana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (549, 85, 'Jicotea');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (550, 85, 'Mataguá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (551, 85, 'Güinia de Miranda');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (552, 85, 'Seibabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (553, 85, 'Arroyo Seco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (554, 85, 'Jorobada');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (555, 85, 'El Marino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (556, 85, 'La Herradura');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (557, 85, 'Las Cajas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (558, 85, 'Potrero de Güinia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (559, 85, 'Provincial');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (560, 80, 'Suazo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (561, 80, 'Vigía - Copey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (562, 80, 'Pujol - Los Chinos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (563, 80, 'Plazoleta - Las Minas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (564, 80, 'Frigorí?co - Cumbre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (565, 80, 'Báez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (566, 80, 'Falcón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (567, 80, 'Miller');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (568, 80, 'Juan Pedro Carbó Serviá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (569, 80, 'Hermanos Ameijeiras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (570, 80, 'Falero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (571, 80, 'Nazareno');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (572, 80, 'Benito Juárez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (573, 80, 'Manzanares');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (574, 80, 'Guaracabulla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (575, 74, 'La Puya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (576, 74, 'José René Riquelme');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (577, 74, 'Panchito Gómez Toro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (578, 74, 'Lutgardita – Carahatas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (579, 84, 'Rancho Grande - Jagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (580, 84, 'Ranchuelo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (581, 84, 'Carlos Caraballo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (582, 84, 'Ranchuelo Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (583, 84, 'Esperanza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (584, 84, 'San Juan de los Yeras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (585, 84, 'Jicotea');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (586, 84, 'Horqueta - Delicias');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (587, 84, 'Diez de Octubre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (588, 84, 'Ifraín Alfonso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (589, 84, 'Osvaldo Herrera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (590, 79, 'Remedios');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (591, 79, 'Remedios II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (592, 79, 'Viñas - Bartolomé');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (593, 79, 'Zulueta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (594, 79, 'Heriberto');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (595, 79, 'Carrillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (596, 79, 'Remate de Ariosa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (597, 79, 'Chiquitico Fabregat');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (598, 79, 'Buenavista');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (599, 79, 'Tahon - Francisco Pérez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (600, 75, 'Villa Alegre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (601, 75, 'Sitiecito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (602, 75, 'Centro Victoria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (603, 75, 'Jumagua - Caguagas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (604, 75, 'Coco Solo - Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (605, 75, 'San Juan - Finalet');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (918, 129, 'Sosa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (606, 75, 'Isabela de Sagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (607, 75, 'Viana - La Rosita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (608, 75, 'Reparto 26 de Julio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (609, 81, 'Camacho - Libertad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (610, 81, 'Capiro - Santa Catalina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (611, 81, 'Bengochea - Sandino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (612, 81, 'Hospital');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (613, 81, 'Condado Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (614, 81, 'Virginia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (615, 81, 'Abel Santamaria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (616, 81, 'Antón Díaz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (617, 81, 'Hatillo - Yabú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (618, 81, 'Aeropuerto');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (619, 81, 'Universidad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (620, 81, 'Manajanabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (621, 81, 'Sakenaf');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (622, 81, 'Condado Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (623, 81, 'Escambray');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (624, 81, 'Chambery');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (625, 81, 'José Martí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (627, 81, 'Camilo Cienfuegos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (628, 83, 'Punta Felipe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (629, 83, 'Cascajal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (630, 83, 'Mordazo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (631, 83, 'Sabino Hernández');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (632, 83, 'Manacas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (633, 83, 'George Washigton');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (634, 83, '26 de Julio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (635, 83, 'Carlos Baliño');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (636, 83, 'Rodrigo - Amaro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (637, 83, 'El Jardín');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (638, 83, 'La Palma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (639, 97, 'Urbano 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (640, 97, 'Urbano 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (641, 97, 'Cuatro Esquina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (642, 97, 'Guayos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (643, 97, 'Neiva');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (644, 97, 'Tres Palmas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (645, 97, 'Jíquima');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (646, 97, 'Las Minas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (647, 97, 'Potrerillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (648, 97, 'Santa Lucia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (649, 97, 'Punta Diamante');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (650, 98, 'Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (651, 98, 'Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (652, 98, 'Agabama');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (653, 98, 'La Redonda');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (654, 98, 'Sopimpa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (655, 98, 'Pedrero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (656, 98, 'Jíquima');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (657, 98, 'El Ñame');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (658, 95, 'Zona Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (659, 95, 'Zona Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (660, 95, 'Arroyo Blanco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (661, 95, 'Jobo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (662, 95, 'El Patio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (663, 95, 'El Majá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (664, 95, 'Cristales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (665, 95, 'La Yaya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (666, 95, 'San Felipe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (667, 101, 'Heriberto Orellanes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (668, 101, 'La Ferrolana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (669, 101, 'El Jíbaro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (670, 101, 'Las Nuevas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (671, 101, 'Mapos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (672, 100, 'Parque');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (673, 100, 'Kilo 12');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (674, 100, 'Los Olivos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (675, 100, 'Colón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (676, 100, 'Jesús María');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (677, 100, 'Guasimal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (678, 100, 'Banao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (679, 100, 'Tunas de Zaza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (680, 100, 'Las Tozas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (681, 100, 'Managuaco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (682, 100, 'Pojabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (683, 100, 'Paredes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (684, 100, 'Las Yayas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (685, 96, 'Serafín Sánchez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (686, 96, 'Tuinucú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (687, 96, 'Zaza del Medio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (688, 96, 'Siguaney');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (689, 96, 'Ojo de Agua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (690, 96, 'La Yamagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (691, 96, 'La Rana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (692, 99, 'Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (693, 99, 'Zona Monumento');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (694, 99, 'Armando Mestre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (695, 99, 'La Purísima');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (696, 99, 'Casilda');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (697, 99, 'FNTA');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (698, 99, 'Condado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (699, 99, 'Topes de Collante');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (700, 99, 'San Pedro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (701, 99, 'Manacas - Iznaga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (702, 99, 'Algarrobo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (703, 99, 'Pitajones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (704, 99, 'Caracusey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (705, 94, 'La Loma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (706, 94, 'Sansaricq');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (707, 94, 'CAI Obdulio Morales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (708, 94, 'CAI Aracelio Iglesias');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (709, 94, 'CAI Simón Bolivar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (710, 94, 'Turquino I');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (711, 94, 'Turquino II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (712, 94, 'Meneses');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (713, 94, 'Mayajigua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (714, 94, 'Iguará');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (715, 94, 'Jarahueca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (716, 94, 'Venegas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (717, 94, 'El Río');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (718, 94, 'Seibabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (719, 94, 'Perea');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (720, 94, 'Itabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (721, 106, 'Santana Ana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (722, 106, 'Cacahual');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (723, 106, 'Las Marías');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (724, 106, 'Peonía');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (725, 106, 'Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (726, 106, 'Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (727, 103, 'Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (728, 103, 'Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (729, 103, 'Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (730, 103, 'Vaquerito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (731, 103, 'Patria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (732, 103, 'Turiguanó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (733, 111, 'Baraguá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (734, 111, 'Las 20');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (735, 111, 'Colorado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (736, 111, 'Gaspar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (737, 111, 'Centro - Corojo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (738, 111, 'Pesquería');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (739, 108, 'Guayacanes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (740, 108, 'Orlando González');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (741, 108, 'Limones Palmero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (742, 108, 'Mamonal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (743, 108, 'Majagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (744, 107, 'Florencia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (745, 107, 'Tamarindo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (746, 107, 'Guadalupe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (747, 107, 'Marroquí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (748, 102, 'Chambas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (749, 102, 'Máximo Gómez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (750, 102, 'Enrique Varona');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (751, 102, 'Los Perros');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (752, 102, 'Ranchuelo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (753, 102, 'Mabuya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (754, 102, 'Las Palmas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (755, 102, 'Calvario');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (756, 102, 'El Asiento');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (763, 104, 'Bolivia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (764, 104, 'La Loma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (765, 104, 'Yarual');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (766, 104, 'Liborio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (767, 104, 'Mira?ores Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (768, 104, 'Mamey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (769, 104, 'La 30');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (770, 109, 'Onelio Hernández Taño');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (771, 109, 'Roberto Rívas Fraga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (772, 109, 'Indalecio Montejo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (773, 109, 'Centro del Pueblo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (774, 109, 'Ángel Alfredo Pérez Rivero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (775, 109, 'Alfredo Gutiérrez Lugones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (776, 109, 'Pedro Martínez Brito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (777, 109, 'Ceballos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (778, 109, 'Jicotea');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (779, 110, 'Simón Reyes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (780, 110, 'Venezuela');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (781, 110, 'Júcaro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (782, 110, 'Manuel Sanguily');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (783, 110, 'Los Negros');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (784, 110, 'Jagueyal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (790, 113, 'Esmeralda Norte ');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (791, 113, 'Esmeralda Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (792, 113, ' Tabor');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (793, 113, 'Brasil ');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (794, 113, 'Jiquí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (795, 113, 'Mamanantuabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (796, 120, 'Conquista');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (797, 120, 'Rodolfo Ramírez Esquivel ');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (761, 105, 'Corea');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (760, 105, 'Pedro Ballester');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (759, 105, 'Grúa Nueva');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (758, 105, 'Georgina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (757, 105, 'Primero de Enero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (789, 112, 'Magarabomba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (788, 112, 'El Quirch');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (786, 112, 'Estrella');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (785, 112, 'Céspedes ');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (798, 120, 'Agramonte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (799, 120, 'Ibarra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (800, 120, ' Argentina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (801, 120, 'Las Parras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (802, 120, 'San Antonio ');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (890, 126, 'Delicias');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (803, 120, 'Centro Urbano   ');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (804, 120, 'José Martí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (805, 120, 'Rolando Valdivia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (806, 120, 'La Vallita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (825, 117, 'Guáimaro Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (826, 117, 'Guáimaro Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (827, 117, 'Cascorro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (828, 117, 'Martí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (829, 117, 'El Caimito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (830, 117, 'Galbis');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (831, 117, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (844, 123, 'Providencia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (845, 123, 'La Virginia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (846, 123, 'Cuatro Caminos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (847, 123, 'La Bayamesa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (848, 123, 'La Belén');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (849, 123, 'Mojacasabe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (850, 123, 'San José');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (851, 116, 'Santa Lucía');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (852, 116, 'Zona Industrial');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (853, 116, 'Los Micros');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (854, 116, 'No.1 - Tarafa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (855, 116, 'Centro Histórico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (856, 116, 'San Miguel de Bagá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (857, 116, 'Camalote');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (858, 118, 'Sibanicú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (859, 118, 'Siboney');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (860, 118, 'Hatuey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (861, 118, 'Alfredo Álvarez Mola');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (862, 118, 'La Norma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (863, 118, 'Oriente Rebelde');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (864, 118, 'Patricio Lumumba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (865, 114, 'Cubitas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (866, 114, 'Sola 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (867, 114, 'Sola 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (868, 114, 'La Gloria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (869, 114, 'Vilató');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (870, 124, 'Forestal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (871, 124, 'El Carmen');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (872, 124, 'Cándido González');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (873, 124, 'La Jagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (874, 124, 'Flor de Mayo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (875, 124, 'Arroyo Blanco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (876, 124, 'Caobita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (877, 124, 'Santa Cruz Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (878, 124, 'Haití');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (879, 121, 'Centro Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (881, 121, 'Tejón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (882, 121, 'Ruta Invasora');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (883, 121, 'Jimagüayú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (884, 121, 'Manantiales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (823, 119, 'América Latina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (822, 119, 'San Juan de Dios');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (821, 119, 'Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (820, 119, 'Vigía - Florat');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (819, 119, 'Agramante - Simoni');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (818, 119, 'La Belén');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (816, 119, 'Julio Antonio Mella');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (815, 119, 'Jayamá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (814, 119, 'Garrido - La Caridad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (813, 119, 'Lenin - Albaisa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (812, 119, 'Puerto Príncipe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (811, 119, 'Edén - Juruquey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (810, 119, 'San Blas oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (809, 119, 'La esperanza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (808, 119, 'Previsora');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (807, 119, 'Modelo-Iman');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (837, 122, 'Nicaragua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (835, 122, 'Las Cruces');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (834, 122, 'Contramaestre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (833, 122, 'Rescate de Sanguily');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (832, 122, 'Jimaguayú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (838, 115, 'Minas I');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (843, 115, 'Caidije');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (842, 115, 'Redención');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (841, 115, 'Lugareño');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (840, 115, 'Senado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (839, 115, 'Minas II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (966, 136, 'Antilla 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (885, 121, 'Batalla de las Guásimas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (886, 121, 'Batalla 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (967, 136, 'Antilla 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (887, 121, 'Aguilar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (888, 126, 'Malecón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (889, 126, 'El Uvero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (891, 126, 'La Viste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (892, 126, 'Maniabón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (893, 126, 'San Manuel');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (894, 126, 'El Yarey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (895, 126, 'Piedra Hueca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (896, 126, 'Canal Azul');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (897, 126, 'Plaza de la Revolución');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (898, 131, 'Anacaona');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (899, 131, 'Progreso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (900, 131, 'San José');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (901, 131, 'Triángulo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (902, 129, 'Centro de la Ciudad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (903, 129, 'Buena Vista');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (904, 129, 'Aeropuerto – Las 40');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (905, 129, 'Buenas Vista - Santo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (906, 129, 'La Aurora y Velázquez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (907, 129, 'Yariguá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (908, 129, 'Villa Nueva');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (909, 129, 'Jobabito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (910, 129, 'Bartle');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (911, 129, 'Barranca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (912, 129, 'Hermanos Mayo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (913, 129, 'Veguita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (914, 129, 'Santo Domingo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (915, 129, 'Pena y La Loma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (916, 129, 'Aguilera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (917, 129, 'Los Pinos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (919, 125, 'Puerto Manatí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (920, 125, 'Pecuario');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (921, 125, 'La Constructiva');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (922, 125, 'Dumañuecos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (923, 125, 'La Guinea');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (924, 125, 'Cerro de Caisimú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (925, 125, 'Fleitas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (926, 125, 'Las Catalinas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (927, 125, 'Urbano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (928, 125, 'Tasajera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (929, 128, 'Calixto');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (930, 128, 'Gaston');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (931, 128, 'Naranjo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (932, 128, 'Las Parras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (933, 128, 'La Posta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (934, 128, 'Ojo de Agua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (935, 128, 'Omaja');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (936, 128, 'Providencia 4');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (937, 127, 'El Batey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (938, 127, 'Vedado 3');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (939, 127, 'El Canal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (940, 127, 'Santa María 14');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (941, 127, 'La Yaya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (942, 127, 'Lora');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (943, 127, 'Pueblo Viejo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (944, 127, 'San Agustín');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (945, 130, 'Dos Hermanos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (946, 130, 'Argentina Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (947, 130, 'Argentina Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (948, 130, 'Bracitos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (949, 130, 'Las Margaritas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (950, 130, 'Santa Rosa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (951, 130, 'Zábalo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (952, 130, 'San Antonio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (953, 130, 'EL Níspero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (954, 130, 'Mejía');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (955, 130, 'Urbano este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (956, 130, 'Urbano Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (957, 130, 'Sirven');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (958, 132, 'La Carretera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (959, 132, 'El Batey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (960, 132, 'La Aurora');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (961, 132, 'Ana Luisa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (962, 132, 'Pedro Plaza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (963, 132, 'Guayabal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (964, 132, 'Vicente Pérez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (965, 132, 'El Paraíso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (968, 136, 'El Ramón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (969, 137, 'Alcalá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (973, 137, 'La Caridad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (972, 137, 'El Manguito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (971, 137, 'Bijarú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (970, 137, 'Báguanos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (980, 135, 'Silva');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (981, 135, 'Centro Ciudad Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (982, 135, 'Nicaragua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (983, 135, 'Betancourt');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (984, 135, 'Macabí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (985, 135, 'Deleite');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (986, 135, 'Cañadón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (987, 135, 'Guardalavaca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (988, 135, 'Los Ángeles');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (989, 135, 'Retrete');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (990, 135, 'Mulas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (991, 135, 'Los Pinos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (992, 135, 'Feria 5');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (993, 135, 'Cortaderas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (994, 135, 'Flores');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (995, 135, 'Río Seco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1006, 139, 'Buenaventura 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1007, 139, 'Buenaventura 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1008, 139, 'San Agustín');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1009, 139, 'Mir');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1010, 139, 'La Jíquima');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1011, 139, 'Vista Hermosa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1012, 139, 'Guaramanao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1013, 139, 'Las Calabazas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1014, 139, 'Las Casimbas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1015, 139, 'Guayabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1016, 139, 'Monte Alto');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1017, 139, 'Sabanazo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1018, 142, 'Cueto Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1019, 142, 'Cueto Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1020, 142, 'Barajagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1021, 142, 'Guamuta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1022, 142, 'Marcané');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1023, 142, 'Alto Cedro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1024, 142, 'Birán');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1025, 144, 'Cayo Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1026, 144, 'El Quemado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1027, 144, 'Barredera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1028, 144, 'Río Grande');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1029, 144, 'Cananova');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1030, 144, 'Cebolla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1031, 144, 'Miraflores');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1032, 144, 'Cayo Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1033, 141, 'Urbano Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1034, 141, 'Urbano Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1035, 141, 'Urbano Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1036, 141, 'San Francisco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1037, 141, 'La Cuchilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1038, 141, 'El Níspero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1039, 141, 'Indio Uno');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1040, 141, 'Las 40');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1041, 141, 'Guillermo Espinosa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1042, 141, 'La Camilo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1043, 145, 'Sagua Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1044, 145, 'Sagua Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1045, 145, 'San Pedro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1046, 145, 'Carpintero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1047, 145, 'El Sopo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1048, 145, 'Castro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1049, 145, 'Plazuela');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1050, 145, 'El Sitio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1051, 145, 'Naranjo Agrio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1052, 145, 'Calabaza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1053, 145, 'El Carmen');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1054, 145, 'El Progreso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1055, 145, 'El Jobo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1056, 145, 'Marieta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1057, 138, 'Alcides Pino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1058, 138, 'Vista Alegre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1059, 138, 'Pedro Díaz Coello');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1060, 138, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1061, 138, 'Alex Urquiola');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1062, 138, 'Edecio Pérez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (978, 137, 'La Esperanza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (977, 137, 'Tacajó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (976, 137, 'San Gerónimo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (975, 137, 'Potrerillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (974, 137, 'Los Haticos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (996, 140, 'Cayo Cedro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1004, 140, 'Limpio Chiquito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1003, 140, 'Antonio Maceo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1002, 140, 'Cupey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1001, 140, 'La Fortuna');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1000, 140, 'Cacocum');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (999, 140, 'Juan Durán');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (998, 140, 'La Agraria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (997, 140, 'Cañada Ancha');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1120, 134, 'Santa Lucía');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1063, 138, 'Distrito Lenin');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1064, 138, 'Centro Ciudad Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1065, 138, 'Centro Ciudad Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1066, 138, 'San Andrés');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1068, 138, 'Aguas Claras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1069, 138, 'Sao Arriba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1070, 138, 'El Purial');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1071, 138, 'San Rafael');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1072, 138, 'La Cuaba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1073, 138, 'Pedernales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1075, 138, 'Zona Industrial');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1129, 134, 'La Fe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1076, 138, 'Yuraguana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1077, 138, 'Arroyo Blanco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1079, 133, 'Gibara 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1080, 133, 'Gibara 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1081, 133, 'Velasco 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1082, 133, 'Velasco 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1083, 133, 'Caletones(Costa Sierra)');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1084, 133, 'Bocas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1085, 133, 'Arroyo Seco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1086, 133, 'Cañada de Melones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1087, 133, 'Uñas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1088, 133, 'Floro Pérez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1089, 143, 'Nicaro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1090, 143, 'Primero de Enero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1091, 143, 'Mayarí Ciudad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1092, 143, 'Cabonico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1093, 143, 'Cajimaya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1094, 143, 'El Níspero (Guanina)');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1095, 143, 'Guayabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1096, 143, 'Colorado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1097, 143, 'Pinares');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1098, 143, 'Arroyo Seco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1099, 143, 'Juan Vicente');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1100, 143, 'Cosme');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1101, 143, 'Caridad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1102, 143, 'La Ayúa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1103, 143, 'Felton');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1104, 143, 'Chavaleta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1105, 143, 'Guatemala');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1106, 143, 'Guaro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1107, 143, 'Naranjal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1108, 143, 'Nipe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1109, 143, 'Levisa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1110, 146, 'Moa Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1111, 146, 'Caribe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1112, 146, 'Rolo Veguita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1113, 146, 'Centeno');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1114, 146, 'Yamanigüey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1115, 146, 'Las Coloradas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1116, 146, 'Punta Gorda');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1117, 146, '26 de Junio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1118, 146, 'Los Mangos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1119, 146, 'Miraflores');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1130, 147, 'Río');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1131, 147, 'Cayamas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1132, 147, 'Cauto Embarcadero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1133, 147, 'Grito de Yara');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1134, 147, 'Vado del Yeso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1135, 147, 'Guamo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1136, 147, 'Guamo Viejo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1137, 147, 'Batey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1138, 147, 'Las 1009');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1139, 147, 'Cauto el Paso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1140, 148, 'Cauto Cristo Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1141, 148, 'Cauto Cristo Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1142, 148, 'La Seis');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1143, 148, 'Papi Lastre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1144, 148, 'Tranquera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1145, 148, 'Babiney');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1146, 149, 'Jiguaní Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1147, 149, 'Jiguaní Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1148, 149, 'Las Palmas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1149, 149, 'Las Minas de Charco Redondo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1150, 149, 'Las delicias');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1151, 149, 'Palmarito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1152, 149, 'Santa Rita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1153, 149, 'Cautillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1154, 149, 'La Rinconada');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1128, 134, 'La Ceiba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1127, 134, 'Melones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1126, 134, 'Dagames');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1125, 134, 'Altuna');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1124, 134, 'Progreso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1122, 134, 'La Caridad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1121, 134, 'Fray Benito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1155, 150, 'Camilo Cienfuegos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1156, 150, 'El Horno');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1157, 150, 'Guasimilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1158, 150, 'Molino Rojo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1159, 150, 'Santa María');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1160, 150, 'Aeropuerto Viejo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1161, 150, 'Las Mangas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1162, 150, 'Pompita Malvango');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1164, 150, 'Julia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1165, 150, 'Barranca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1166, 150, 'Entronque de Bueycito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1167, 150, 'William Soler');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1168, 150, 'El Dátil');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1169, 150, 'El Almirante');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1170, 150, 'Las Tamaras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1171, 150, 'Francisco Vicente Aguilera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1172, 150, 'Siboney');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1173, 150, 'El Valle');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1174, 150, 'Rosa La Bayamesa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1175, 150, 'San Juan El Cristo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1176, 150, 'Jesús Menéndez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1177, 150, 'Antonio Guiteras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1178, 151, 'Yara Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1179, 151, 'Yara Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1180, 151, 'Veguita Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1181, 151, 'José Martí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1182, 151, 'Mateo Romás');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1183, 151, 'Cayo Redondo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1184, 151, 'Sofía');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1185, 151, 'Los Cayos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1186, 151, 'Paquito Rosales Benítez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1187, 151, 'El Espino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1188, 151, 'Buey de Gallego');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1189, 151, 'Las Caobas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1190, 151, 'Veguita Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1191, 152, 'Las Novillas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1192, 152, 'Caymari');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1193, 152, 'Horacio Rodríguez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1194, 152, 'Celia Sánchez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1195, 152, 'Vuelta del Caño');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1196, 152, 'Andrés Lujan Vázquez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1197, 152, 'Gutiérrez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1198, 152, 'Paquito Rosales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1199, 152, 'La Demajagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1200, 152, 'Sitio Remate');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1201, 152, 'Jibacoa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1202, 152, 'Cayo Espino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1203, 152, 'San Francisco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1204, 152, 'Pedro Soto Alba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1205, 152, 'Carlos Coello');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1206, 152, 'Camilo Cienfuegos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1207, 153, 'Campechuela Nro1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1208, 153, 'Campechuela Nro2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1209, 153, 'Ceiba Hueca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1210, 153, 'San Ramón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1211, 153, 'Ceiba Hueca Arriba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1212, 153, 'La Gloria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1213, 153, 'Alto de Jo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1214, 153, 'Cienaguilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1215, 153, 'Miguel Sánchez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1216, 154, 'Nuevo Media Luna');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1217, 154, 'Los Guayos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1218, 154, 'La Maguana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1219, 154, 'Colorado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1221, 154, 'Vista Alegre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1222, 154, 'Cinco Palmas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1223, 154, 'La Junta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1224, 154, 'El Carmen');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1225, 155, 'Belic');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1226, 155, 'El Hondón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1227, 155, 'La Ricardo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1228, 155, 'Río Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1229, 155, 'Montero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1230, 155, 'Urbano Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1231, 155, 'Urbano Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1232, 155, 'Urbano Este');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1233, 156, 'Brigadas Cañeras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1234, 156, 'Sevilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1235, 156, 'El Plátano');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1236, 156, 'Batey Azucarero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1237, 156, 'Ojo de Agua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1238, 156, 'Ramón del Portillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1239, 156, 'Caridad de Mota');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1240, 156, 'Nuevo Pilón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1242, 157, 'Caney de las Mercedes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1253, 158, 'Amador Liens Cabrera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1254, 158, 'Bueycito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1255, 158, 'La Piñuela');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1256, 158, 'Nuevo Yao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1257, 158, 'Maguaro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1258, 158, 'San Pablo de Yao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1259, 158, 'El Relave');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1260, 158, 'San Antonio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1261, 158, 'La Estrella');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1262, 158, 'Virey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1263, 159, 'Palma del Perro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1264, 159, 'Urbano No.1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1265, 159, 'Urbano No.2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1266, 159, 'Loma de Piedra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1267, 159, 'Monjará');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1268, 159, 'Macanacú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1269, 159, 'Los Horneros');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1270, 159, 'Corralillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1271, 159, 'Victorino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1272, 159, 'El Bombón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1273, 159, 'La Plata');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1274, 159, 'Los Números');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1275, 160, 'Frank País García');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1276, 160, 'Lumumba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1277, 160, 'Maffo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1278, 160, 'América');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1279, 160, 'Laguna Blanca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1280, 160, 'Los Pasos de Xavier');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1281, 160, 'Guaninao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1282, 160, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1283, 160, 'La Torcaza');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1284, 160, 'Baire');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1285, 160, 'El Acantilado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1286, 160, 'Pino de Baire');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1287, 160, 'Los Negros');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1288, 160, 'Bungo - La Venta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1289, 160, 'Ruta Martiana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1290, 168, 'Madrugón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1291, 168, 'Bahía Larga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1292, 168, 'El Francés');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1293, 168, 'Brazo Frío');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1294, 168, 'Aserradero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1295, 168, 'La Plata');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1296, 168, 'Ocujal del Turquino');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1298, 168, 'Chivirico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1299, 168, 'Calentura');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1301, 168, 'La Magdalena');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1302, 168, 'Caletón Blanco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1311, 166, 'La Cuba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1312, 166, 'Oscar Lucero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1313, 166, 'Aguacate');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1314, 166, 'Dos Ríos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1315, 166, '28 de Septiembre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1316, 166, 'La Ceiba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1317, 166, 'Victoria de Girón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1318, 166, 'Dos Palmas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1319, 166, 'Yaveremos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1320, 166, 'Carmelié');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1321, 166, 'Maibio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1322, 166, 'Candonga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1323, 166, 'La Aduana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1324, 166, 'Caney del Sitio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1325, 166, 'Ramón de Guaninao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1326, 166, 'La Curia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1327, 166, 'Yarayabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1328, 166, 'La Clarita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1329, 166, 'Las Coloradas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1330, 166, 'Chaveco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1303, 161, 'Oscar Lucero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1308, 161, '21 de Abril');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1309, 161, 'Batallán');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1307, 161, 'Regina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1306, 161, 'Palmarito de Cauto');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1305, 161, 'Mangos de Baraguá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1304, 161, 'Julio Antonio Mella');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1243, 157, 'Masó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1244, 157, 'Las Mercedes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1245, 157, 'San Lorenzo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1246, 157, 'Canabacoa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1247, 157, 'Providencia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1249, 157, 'El Podrío');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1250, 157, 'El Corojo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1251, 157, 'Sao Grande');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1331, 166, 'Nito Ortega');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1349, 165, 'Distrito José Martí Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1351, 165, 'Flores');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1352, 165, 'Ciudamar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1353, 165, 'El Caney');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1354, 165, 'El Cobre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1355, 165, 'El Cristo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1356, 165, 'Siboney');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1357, 165, 'Poblado Boniato');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1358, 165, 'Santa Bárbara');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1359, 165, 'Distrito José Martí Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1360, 165, 'Agüero Mar Verde');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1361, 165, 'Los Olmos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1362, 165, 'Guillermón Moncada');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1363, 165, 'Los Maceo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1364, 165, 'José María Heredia');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1365, 165, 'Vista Hermosa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1366, 165, 'Veguita de Galo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1367, 165, 'Chicharrones');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1368, 165, 'Sueño');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1369, 165, 'Vista Alegre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1370, 165, '30 de Noviembre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1371, 165, 'El Ramón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1372, 165, 'El Escandel');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1373, 165, 'Sigua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1374, 165, 'Mariana Grajales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1375, 165, 'Manuel Isla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1376, 165, 'Haydeé Santamaría');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1377, 165, 'Nuevo Vista Alegre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1378, 165, 'Abel Santa María');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1379, 163, 'Mayari Arriba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1380, 163, 'Concepción');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1381, 163, 'Sabanilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1382, 163, 'Soledad de Mayarí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1383, 163, 'Tumba Siete');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1384, 163, 'El Rosario');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1385, 163, 'San Benito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1386, 163, 'Loma Blanca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1387, 163, 'Boca de Mícara');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1404, 167, 'Matías');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1405, 167, 'Cruce de los Baños');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1406, 167, 'La Tabla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1407, 167, 'Comecará');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1408, 167, 'Arroyo Rico');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1409, 167, 'El Laurel');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1410, 167, 'Las Bocas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1411, 167, 'Filé');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1412, 172, 'Nibujón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1413, 172, 'Cayo Güín');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1414, 172, 'Quiviján');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1415, 172, 'Mabujabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1416, 172, 'El Turey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1417, 172, 'La Playa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1418, 172, 'La Asunción');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1421, 172, '30 Aniversario');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1347, 162, 'Paquito Rosales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1346, 162, 'El Tetuán');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1345, 162, 'El Palmar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1344, 162, 'Bucuey');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1333, 162, 'Chile');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1336, 162, 'Emma Rosa Chuig');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1337, 162, 'Rafael Reyes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1338, 162, 'Estrella Roja');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1340, 162, 'Paraíso');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1341, 162, 'La Caoba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1342, 162, 'Chamarreta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1403, 164, 'La Perla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1402, 164, 'Yerba de Guinea');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1401, 164, 'Ti Arriba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1399, 164, 'Jutinicú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1398, 164, 'San Benito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1397, 164, 'El Manguito');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1396, 164, 'Sabanilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1395, 164, 'Matahambre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1394, 164, 'Jarahueca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1393, 164, 'Los Reynaldo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1392, 164, 'La Prueba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1391, 164, 'Alto_Songo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1390, 164, 'Maya Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1388, 164, 'Maya Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1422, 172, 'Sabanilla');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1424, 172, 'Mosquitero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1425, 172, 'Mata-Guandao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1426, 172, 'Mandinga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1427, 176, 'Loma Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1428, 176, 'Loma Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1429, 176, 'Mártires de la Frontera');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1430, 169, 'El Salvador');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1431, 169, 'Sempré');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1432, 169, 'Carrera Larga');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1433, 169, 'Cuneira');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1434, 169, 'Costa Rica');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1435, 169, 'El Lechero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1436, 169, 'San Fernando');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1437, 169, 'Bayate');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1438, 169, 'Limonar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1439, 169, 'La Escondida');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1440, 169, 'Sabaneta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1441, 169, 'Bombí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1442, 177, 'Rubén López Sabariego');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1443, 177, 'San Justo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1444, 177, 'Caribe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1445, 177, 'Pastorita');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1446, 177, 'Centro Oeste');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1447, 177, 'Centro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1448, 177, 'Sur-Isleta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1449, 177, 'Sur-Hospital');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1450, 177, 'Paraguay');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1457, 173, 'La Máquina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1458, 173, 'Punta de Maisí');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1459, 173, 'La Asunción');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1460, 173, 'Cantillo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1461, 173, 'La Tinta');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1462, 173, 'Boca de Jauco');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1463, 173, 'Vertientes');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1464, 173, 'Sabana');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1465, 170, 'Héctor Infante');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1466, 170, 'Manuel Tames');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1467, 170, 'La Caridad de los Indios');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1468, 170, 'Ciro Frías');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1469, 170, 'Jamaica');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1470, 170, 'Honduras');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1471, 170, 'Argeo Martínez');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1472, 170, 'La Tagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1473, 170, 'Santa Catalina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1480, 175, 'Yateritas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1481, 175, 'San Antonio del Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1482, 175, 'Guaibanó');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1483, 175, 'Maya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1484, 175, 'Puriales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1485, 171, 'Felicidad');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1486, 171, 'Monte Verde');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1487, 171, 'La Carolina');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1488, 171, 'Palenque');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1489, 171, 'Arroyo del Medio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1490, 171, 'Bernardo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1491, 179, 'Centro Histórico Santa Fé');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1492, 179, 'Los Paneles');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1493, 179, 'Micro 70');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1494, 179, 'Abel Santamaría');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1495, 179, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1496, 179, '26 de Julio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1497, 179, 'Sierra Caballos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1498, 179, 'Centro Histórico Nueva Gerona');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1499, 179, 'La Demajagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1500, 179, 'Argelia - Victoria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1501, 179, 'Delio Chacón');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1502, 179, 'La Reforma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1503, 179, 'Patria');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (448, 93, 'Juraguá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (880, 121, 'Panamá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1067, 138, 'Purnio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1474, 178, 'La Yaya');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1475, 178, 'Ullao');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1476, 178, 'Vilorio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1477, 178, 'El Silencio');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1478, 178, 'Casimba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1479, 178, 'Maca');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1456, 174, 'Jesús Lores');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1455, 174, 'Los Calderos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1454, 174, 'El Jobo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1453, 174, 'Veguita del Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1452, 174, 'Cajobabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1451, 174, 'Yacabo Arriba');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (2, 7, 'Villa I');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (3, 7, 'Villa II');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (4, 7, 'Pueblo Nuevo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (5, 7, 'Cayo Largo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (6, 7, 'Arroyo de Agua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (7, 7, 'Crucero de Echevarría');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (8, 7, 'El Canal');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (9, 7, 'Entronque de Herradura');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (10, 7, 'Herradura');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (11, 7, 'Entronque de Pilotos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (12, 7, 'Pilotos');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (13, 7, 'Puerta de Golpe');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (14, 7, 'Alonso Rojas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (15, 11, 'Guane 1');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (403, 60, 'Playa');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1220, 154, 'Pons');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1297, 168, 'Uvero');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (16, 11, 'Guane 2');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (17, 11, 'Combate de la Tenería');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (18, 11, 'Sábalo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (19, 11, 'Isabel Rubío');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (20, 11, 'Molina - El Valle');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (21, 11, 'Punta de la Sierra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (22, 11, 'Los Portales');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (23, 5, 'San Andrés');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (24, 5, 'Rafael Ferro');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (25, 5, 'Caiguanabo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (26, 5, 'La Sierra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (27, 5, 'La Palma');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (28, 5, 'La Jagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (29, 5, 'Central Manuel Sanguily');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (30, 5, 'Mil Cumbre');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (31, 5, 'Las Cadenas');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (32, 5, 'Santos Cruz');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (33, 6, 'Los Palacios Norte');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (34, 6, 'Los Palacios Sur');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (35, 6, 'Bacunagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (36, 6, 'Sierra Maestra');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (37, 6, 'Entronque de Palacios');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (38, 6, 'Paso Real de San Diego');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (39, 6, 'Paso Quemado');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (40, 6, 'San Diego de los Baños');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (311, 23, 'Miramar');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1078, 138, 'Harlem');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1420, 172, 'Cabacú');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (41, 2, 'El Ají');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (84, 9, 'Río Feo');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1163, 150, 'Mabay');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1300, 168, 'Guamá');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1248, 157, 'Frío de Nagua');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1350, 165, 'Altamira');
INSERT INTO "localidads" ("id", "municipio_id", "title") VALUES (1419, 172, 'La Reforma');

/* 4- Data for the `variables` table  (Records 1 - 14) */

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (1, 'Au', 'Area util interior y exterior', 0.0675, false);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (2, 'Tc', 'Solución técnico constructiva', 0.0654, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (3, 'Ec', 'Estado de conservación y edad de la vivienda', 0.0709, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (4, 'Cf', 'Confort ambiental y eficiencia energética', 0.0724, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (5, 'Cr', 'Colindancia, privacidad y relacion con la calle', 0.0663, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (6, 'Ds', 'Distancia vivienda - servicios publicos', 0.0651, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (7, 'Vs', 'Visuales desde la vivienda y calidad del paisaje', 0.0585, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (8, 'Iu', 'Calidad de infraestructura urbana', 0.0756, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (9, 'Rd', 'Riesgos de desastres', 0.072, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (10, 'Pu', 'Prosperidad urbana', 0.065, false);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (11, 'Sc', 'Seguridad ciudadana', 0.0754, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (12, 'Fp', 'Flexibilidad y progresividad', 0.0607, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (13, 'De', 'Calidad de diseño y estética', 0.0625, true);

INSERT INTO "variables" ("id", "cod", "title", "influencia", "visible")
VALUES (14, 'Mh', 'Menaje del hogar', 0.0557, true);


/* 5- Data for the `home_types` table  (Records 1 - 6) */

INSERT INTO "home_types" ("id", "title", "value")
VALUES (1, 'Aislada', 100);

INSERT INTO "home_types" ("id", "title", "value")
VALUES (2, 'Pareada', 70);

INSERT INTO "home_types" ("id", "title", "value")
VALUES (3, 'Medianera', 60);

INSERT INTO "home_types" ("id", "title", "value")
VALUES (4, 'Biplanta', 80);

INSERT INTO "home_types" ("id", "title", "value")
VALUES (5, 'Apartamento', 40);

INSERT INTO "home_types" ("id", "title", "value")
VALUES (6, 'Pent house', 90);


/* 6- Data for the `plans` table  (Records 1 - 2) */

INSERT INTO "plans" ("id", "type", "ranking")
VALUES (1, 'PREMIUM', 1);

INSERT INTO "plans" ("id", "type", "ranking")
VALUES (2, 'FREE', 2);


/* 7 - Data for the `nom_electrodomesticos` table  (Records 1 - 7) */

INSERT INTO "nom_electrodomesticos" ("id", "title", "value")
VALUES (1, 'Televisión', 100);

INSERT INTO "nom_electrodomesticos" ("id", "title", "value")
VALUES (2, 'Aire Acondicionado', 100);

INSERT INTO "nom_electrodomesticos" ("id", "title", "value")
VALUES (3, 'Refrigerador', 100);

INSERT INTO "nom_electrodomesticos" ("id", "title", "value")
VALUES (4, 'Cocina / Horno', 100);

INSERT INTO "nom_electrodomesticos" ("id", "title", "value")
VALUES (5, 'Microwave', 100);

INSERT INTO "nom_electrodomesticos" ("id", "title", "value")
VALUES (6, 'Ventilador', 100);

INSERT INTO "nom_electrodomesticos" ("id", "title", "value")
VALUES (7, 'Computadora', 100);


/* 8- Data for the `nom_moviliarios` table  (Records 1 - 6) */

INSERT INTO "nom_moviliarios" ("id", "title", "value")
VALUES (1, 'Mobiliario de Sala', 100);

INSERT INTO "nom_moviliarios" ("id", "title", "value")
VALUES (2, 'Mobiliario de Comedor', 90);

INSERT INTO "nom_moviliarios" ("id", "title", "value")
VALUES (3, 'Mobiliario de Dormitorios', 100);

INSERT INTO "nom_moviliarios" ("id", "title", "value")
VALUES (4, 'Mobiliario de Terraza', 80);

INSERT INTO "nom_moviliarios" ("id", "title", "value")
VALUES (5, 'Mobiliario de Portal', 60);

INSERT INTO "nom_moviliarios" ("id", "title", "value")
VALUES (6, 'Mobiliario de Estudio / Oficina', 50);


/* 9- Data for the `nom_seg_ciudadanas` table  (Records 1 - 5) */

INSERT INTO "nom_seg_ciudadanas" ("id", "value", "title")
VALUES (1, 100, 'Muy Alta');

INSERT INTO "nom_seg_ciudadanas" ("id", "value", "title")
VALUES (2, 80, 'Alta');

INSERT INTO "nom_seg_ciudadanas" ("id", "value", "title")
VALUES (3, 60, 'Media');

INSERT INTO "nom_seg_ciudadanas" ("id", "value", "title")
VALUES (4, 40, 'Baja');

INSERT INTO "nom_seg_ciudadanas" ("id", "value", "title")
VALUES (5, 20, 'Muy Baja');

