# SQL

## SQL查询接口定义

```sh
curl -X POST -H 'Content-Type: text/plain;charset=UTF-8' -d 'SELECT id, name FROM fruits;' 'https://natrium.herokuapp.com/api/dummy/sql/query'
```

```json
{
  "error": null,
  "payload": [
    {
      "id": 1,
      "name": "Apple"
    },
    {
      "id": 2,
      "name": "Banana"
    },
    {
      "id": 3,
      "name": "Cherry"
    }
  ]
}
```