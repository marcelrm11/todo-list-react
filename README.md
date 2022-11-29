# To-Do List with React

To-Do List connected to a server API built with React.

> This project combines reusable React components and REST API methods (GET, POST, PUT, DELETE). The user can save to-do lists in a remote server.

## Background

This project is part of the learning path in 4Geeks Academy Spain. First step using React with REST API.

## Usage

The main features of this project are the usage of React reusable components and async/await functions to interact with the server API. It also uses React hook useState.

## API/Component

The API used is explained in detail [here](http://assets.breatheco.de/apis/fake/todos/).
The components are structured as follows:
- Home: in this particular project it holds just one child component.
- TodoList: this component holds the main functions, states and controlled sub-components.
- CustomInput: is a reusable input component used in 2 places.
- SetList: is a somehow reusable component that creates a list from a Set.
- DeleteItem: is a sub-component of SetList which defines the action available for each item of the SetList (in this case, delete).

## Installation

Upon downloading the project, install and start scripts are automatically launched. It can be visualized in the browser.
To run the project at any time:

```
  npm run start
```

## Contact info

You can contact me at [marcelrm11@gmail.com](mailto:marcelrm11@gmail.com).

## License

[MIT](https://opensource.org/licenses/MIT)

## Credits

The React boilerplate used for this project was developed by 4Geeks Academy.
You can find it in [this repo](https://github.com/4GeeksAcademy/react-hello.git).
