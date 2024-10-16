#Product Gateway

##Dev

1.- Clonar repositorio
2.- Instalar dependencias
3.- Crear archivo `.env` basado en `.env.template`
4.- Levantar el servidor de NATS

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

5.- Levantar los servicios que se van a utilizar
6.- Ejecutar `npm run start dev`
