# Markdown Links

## Descripción

Los archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Es por esto se creó esta herramienta, que lee y analiza archivos
en formato `Markdown`, para verificar los links que contengan y reporte algunas estadísticas.


## Instalación de md-links
---
~~~
$ npm install vbiaggi10-mdlinks
~~~

## Modo de uso
---
~~~
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
~~~

### Opciones

*  `--version`

Te muestra la version del paquete.

~~~
$ md-links --version
2.0.0
~~~

*  `--help`

Te muestra ayuda con los comandos que puedes usar.

~~~
$ md-links --help
 Usage: cli [options] <path>

  Options:

    -V, --version   output the version number
    -v, --validate  HTTP request to find out if the link works or not
    -s, --stats     basic statistics about links
    -h, --help      output usage information
~~~

*  `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

~~~
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
~~~

* `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas básicas sobre los links.

~~~
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
~~~

* `--stats --validate`

Si combinamos `--stats` y `--validate` obtendremos estadísticas de los resultados de la validación.

~~~
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
~~~

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## Introducción

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecuta JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder interactuar con
el sistema operativo, sistema de archivos, redes, ...
En este proyecto nos alejamos un poco del navegador para construir un programa
que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el
sistema archivos, con el entorno (proceso, env, stdin/stdout/stderr), ...

## Objetivos

El objetivo práctico de este proyecto es que aprendas cómo crear tu propia
**librería** (o biblioteca - _library_) en JavaScript.
Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador porque que te obliga a pensar en la interfaz (API) de tus _módulos_
y como será usado por otros developers, debes tener especial consideración en
peculiaridades del lenguaje, convenciones y buenas prácticas.
