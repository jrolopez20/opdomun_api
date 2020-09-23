# Opdomun API application

### Instalation

Run the following command `npm install` or`yarn install`.

### Configuration

- Create role and database

- Open `.env` file and configure database connection, for example:
```
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=opdomun
DB_PASSWORD=your_password
DB_DATABASE=opdomun_dev
```

- Run migrations

```bash
adonis migration:run
```

- Load `db_init_script.sql` script into database with required data.

- Fill database with dummy data *[Optional]*
```bash
adonis seed:sync
```

### Adonis Swagger Documentation

Open your browser at `http://127.0.0.1:3334/docs`.
