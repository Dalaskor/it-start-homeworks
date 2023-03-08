# NodeJS Server Films
## Команды
npm run start - запуск сервера;
npm run dev - запуск сервера в режиме отладки;
## Параметры для запросов на сервер
### POST
/genre:
name - string

/films:
name - string
year - integer
genres_id - [integer]

### PUT
/genre:
id - integer
name - string

/films:
id - integer
name - string
year - integer
genres_id - [integer]

### DELETE
/genre:
id - integer

/films:
id - integer
