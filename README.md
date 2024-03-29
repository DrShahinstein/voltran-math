# Voltran Math

As the captain and programmer of Voltran -my school's FLL (see First Lego League 2022) team- I developed a tool for our innovative project aimed at finding ways to save unnecessary energy used by street lamps that remain lit at night. This tool assists us in performing the necessary calculations for our project alongside being a pleasent gesture for our team. 

## Technologies

- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Axios](https://axios-http.com/docs/intro)
- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Django Cors Headers](https://pypi.org/project/django-cors-headers/)

## Installation

```bash
$ git clone https://github.com/DrShahinstein/voltran-math.git
$ cd voltran-math/
[voltran-math]$ touch .env # set the env variables here
[voltran-math]$ yarn

$ cd server/
[server]$ pip install -r requirements.txt
[server]$ python manage.py makemigrations
[server]$ python manage.py migrate
```

### Run Locally

```bash
[voltran-math]$ yarn start
[voltran-math]$ python ./server/manage.py runserver
```

## Environment Variables

| Env Variable        | Value                         | Sample                                                |
| ------------------- | ----------------------------- | ----------------------------------------------------- |
| `REACT_APP_API_URL` | URL to the Django API         | `http://127.0.0.1:8000/api`                           |
| `DEBUG`             | Boolean to declare debug mode | `True`                                                |
| `DJANGO_SECRET_KEY` | The secret key for Django     | `i7=eu7cnh0ie3$k-%ju67#s-j-!!z\_\*2a82q0jzdjn-vgox06` |

## Contributing

Pull requests are undoubtly welcome. You'd like to consider open an issue for major changes.

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)
