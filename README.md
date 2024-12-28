# CTIS255 - Frontend Web Technologies Project

This is the project repository for the CTIS255 - Frontend Web Technologies course at Bilkent University in Fall 2024-2025.

> [!IMPORTANT] 
> **Since we used ES Modules, it is not possible to run the project directly on the browser. However, you can run the project on a local server (e.g. Live Server extension in VSCode) or use the online version of the project. The online version of the project is available at the following link: [GitHub Pages](https://sezrr.github.io/ctis255-project/)**

## Project Structure

In this project, component based development and branching strategy is used. The project is divided into several components, each of which is responsible for a specific part of the project. The project structure is as follows:

-   `index.html`: The main HTML file that includes all the components.
-   `src/`: The source folder that includes all the source files.
    -   `assets/`: The assets folder that includes all the images, videos, and other media files.
        -   `data/`: The data folder that includes all the data files.
        -   `images/`: The images folder that includes all the images.
    -   `components/`: The components folder that includes all the components.
    -   `layouts/`: The layouts folder that includes all the layouts.
    -   `models/`: The models folder that includes all the models.
    -   `pages/`: The pages folder that includes all the pages.
        -   `cryptocurrency-page/`: The cryptocurrency page folder that includes all the files related to the cryptocurrency page.
        -   `profiles-page/`: The profiles page folder that includes all the files related to the profiles page.
    -   `stores/`: The stores folder that includes all the stores.
    -   `utils/`: The utils folder that includes all the utility functions.

### Team Members

-   [Arda Becanım](https://github.com/ArdaBejo)
    -   Responsibilities include:
        -   Implementing the [cryptocurrency page trading components](https://github.com/sezRR/ctis255-project/tree/main/src/components/cryptocurrency-components/trading-components) and logic.
-   [Kerem Coşkun](https://github.com/Keremc9)
    -   Responsibilities include:
        -   Implementing the [cryptocurrency page days components](https://github.com/sezRR/ctis255-project/tree/main/src/components/cryptocurrency-components/days-components) and logic.
-   [Oktay Giniş](https://github.com/T4Y017)
    -   Responsibilities include:
        -   Implementing the [profiles page, its components, and logic.](https://github.com/sezRR/ctis255-project/tree/main/src/pages/profiles-page)
        -   Implementing the [user](https://github.com/sezRR/ctis255-project/blob/main/src/models/user.js) and [asset](https://github.com/sezRR/ctis255-project/blob/main/src/models/asset.js) modals.
-   [Sezer Tetik](https://github.com/sezRR)
    -   Responsibilities include:
        -   Establishing the project structure and managing the project.
        -   Implementing the [cryptocurrency page chart components, filter, summary row components and their logic](https://github.com/sezRR/ctis255-project/tree/main/src/components/cryptocurrency-components/chart-components).
        -   Implementing the general components, such as [header](https://github.com/sezRR/ctis255-project/tree/main/src/components/header), [button](https://github.com/sezRR/ctis255-project/tree/main/src/components/button), and [image](https://github.com/sezRR/ctis255-project/tree/main/src/components/image) components.
        -   Implementing the [coins](https://github.com/sezRR/ctis255-project/tree/main/src/models/coins) modals and [chartDetail](https://github.com/sezRR/ctis255-project/blob/main/src/models/chartDetails.js) modal
        -   Implementing the render logic of the components and simulation of global state management.
        -   Implementing the [utility functions and helper functions](https://github.com/sezRR/ctis255-project/tree/main/src/utils).

## Usage

To run the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Start a local server to serrve the project files. (Live Server Extension for Visual Studio Code is recommended)
4. Open the browser and navigate to the local server address. (Usually `http://127.0.0.1:5500`, or `http://localhost:5500`)
5. Enjoy the project!

If you want to access the project online, visit the following link: [GitHub Pages](https://sezrr.github.io/ctis255-project/)
