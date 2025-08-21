<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Biaska/Bookme">
    <img src="./client/public/Bookme-word-logo-blue.png" alt="Logo" height="80">
  </a>

<h3 align="center">Bookme</h3>

  <p align="center">
    A full-stack booking application that offers customers frictionless bookings of services offered by businesses.
    <br />
    <a href="https://github.com/Biaska/Bookme"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Biaska/Bookme">View Demo</a>
    &middot;
    <a href="https://github.com/Biaska/Bookme/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/Biaska/Bookme/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation and Run</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

BookMe is a full-stack web application that streamlines the process of discovering and booking services from businesses. The app provides a seamless experience for both customers and businesses:
- Customers can search for businesses, browse services, and make bookings quickly.
- Businesses can manage their offerings, schedules, and customer reservations from one dashboard.

### Features

- Business Profiles - Each business has its own profile with details, services, and availability.
- Service Management - Businesses can create, edit, and remove services.
- Smart Booking System - Customers can book services directly with real-time validation, with no profile sign-up.
- Search & Filter - Find businesses and services by location and keyword.
- Authentication & Authorization - Secure business management with Auth0.
- Error Handling Middleware - Centralized error management across controllers.
- Database Integration - Persistent storage of users, businesses, services, and bookings.

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Express][Express.js]][Express-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation & Run

This repo is configured with Docker, allowing easy setup and usage without downloading dependencies. To run with docker:

1. Download [Docker](Docker-url):
2. Start containers
   ```sh
   docker compose up -d
   ```

To download and run on your own machine and environment:

1. Clone the repo
   ```sh
   git clone https://github.com/Biaska/Bookme.git
   ```
2. Install NPM packages
   ```sh
   npm run install-all
   ```
3. Spin up the backend + frontend
   ```sh
   npm run dev
   ```
4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin Biaska/Bookme
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/Biaska/Bookme/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Biaska/Bookme" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kyle Bias - biaska70@gmail.com

Project Link: [https://github.com/Biaska/Bookme](https://github.com/Biaska/Bookme)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Biaska/Bookme.svg?style=for-the-badge
[contributors-url]: https://github.com/Biaska/Bookme/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Biaska/Bookme.svg?style=for-the-badge
[forks-url]: https://github.com/Biaska/Bookme/network/members
[stars-shield]: https://img.shields.io/github/stars/Biaska/Bookme.svg?style=for-the-badge
[stars-url]: https://github.com/Biaska/Bookme/stargazers
[issues-shield]: https://img.shields.io/github/issues/Biaska/Bookme.svg?style=for-the-badge
[issues-url]: https://github.com/Biaska/Bookme/issues
[license-shield]: https://img.shields.io/github/license/Biaska/Bookme.svg?style=for-the-badge
[license-url]: https://github.com/Biaska/Bookme/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/kylebias/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Docker]: https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: http://docker.com/
z