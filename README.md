# Assignment solution for Exercism

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with **TypeScript** template and includes **Tailwind 3** CSS.

Deployed version of the project is available on [https://exercism-by-gg.netlify.app/](https://exercism-by-gg.netlify.app/).

## Project Structure

All the source code is present in the src directory with `index.tsx` as the entry point and other files are organized as given below

| Path | Description |
| ---- | ----------- |
| elements | Contains the basic building blocks, such as a button, icon, search, dropdown etc.|
| components | Contains distinct section of an interface (e.g. navigation bar) |
| pages | Implements a particular template for each route |
| hooks | Contains the custom React hooks |
| tests | Contains the corresponding tests |
| types | Contains the common types used among the components e.g. API request/response |
| utils | Contains common utility functions used by the components |
| App.tsx | Main file to handle the top level structuring of pages |
| styles.css | Acts as the global style file and import the Tailwind css styles |

## Features implemented

- Testimonials Container component based on the Figma design
- Filters based on track, page number, exercise and sort type
- All the functionalities mentioned in the requirements like reducing the API calls while the user is still typing.
- Responsive and fully implemented Navbar
- Add Responsiveness to the Testimonials Container component as well. See the sample image in the next section.

## Sample Images of the deployed website

### Testimonials page
#### Desktop View
![Desktop view](https://user-images.githubusercontent.com/34645022/162358398-fe78e577-41a2-4608-b5c6-dd992343311a.png)
#### Tablet View
![Tablet View](https://user-images.githubusercontent.com/34645022/162359057-f84a9944-d051-4a53-8bab-3fa791e6c549.png)
#### Mobile View
![Mobile View](https://user-images.githubusercontent.com/34645022/162359081-49f5e082-ae8d-4f8a-8a80-5834b93ac00f.png)

### Pagination Container

#### Desktop/Tablet View
![Desktop/Tablet View](https://user-images.githubusercontent.com/34645022/162359539-654a2364-6eee-4787-a124-1ded9728246d.png)
#### Mobile View
![Mobile View](https://user-images.githubusercontent.com/34645022/162359387-97237c39-018b-4279-91d1-6543dca1dcea.png)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
