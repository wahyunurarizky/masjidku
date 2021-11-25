/* eslint-disable */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import '@babel/polyfill';
import 'bootstrap';
import { login, logout } from './login';
import {
  createMasjid,
  deleteMasjid,
  fillForm,
  updateMasjid,
} from './manageMasjid';
// import { createMasjid, deleteTeam, updateTeam, fillForm } from './manageTeam';
// import { createPlayer, deletePlayer } from './managePlayers';
// import { addResult, updateResult } from './manageResults';
// import { detailPlayer } from './detailPlayer';
// import { resultDetail } from './resultDetail';
// import { createStreamer, deleteStreamer } from './manageStreamer';
// import { createNews, deleteNews } from './manageNews';

const loginForm = document.querySelector('.form-login');
const formAddMasjid = document.querySelector('.form--addMasjid');
const formUpdateMasjid = document.querySelector('.form--updateMasjid');
const editButton = document.querySelectorAll('.edit-masjid');
const deleteButton = document.querySelectorAll('.delete-masjid');
// const formAddPlayer = document.querySelector('.form--addPlayer');
// const deletePlayerButton = document.querySelectorAll('.delete-player');
// const addResultButton = document.querySelectorAll('.button-add-result');
// const formUpdateResult = document.querySelector('.form--addResult');
// const buttonDetailPlayer = document.querySelectorAll('.btn-detail-player');
// const buttonResultDetail = document.querySelectorAll('.btn-result-detail');
// const formAddStreamer = document.querySelector('.form--addStreamer');
// const deleteStreamerButton = document.querySelectorAll('.delete-streamer');
// const formAddNews = document.querySelector('.form--addNews');
// const deleteNewsButton = document.querySelectorAll('.delete-news');
const btnLogout = document.querySelector('.btn-logout');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (formAddMasjid) {
  formAddMasjid.addEventListener('submit', (e) => {
    e.preventDefault();
    // sama aja buat multipar/form-data
    const form = new FormData();
    // const name = document.getElementById('name').value;
    // const shortName = document.getElementById('shortName').value;

    form.append('name', document.getElementById('name').value);
    form.append(
      'location',
      JSON.stringify({
        address: document.getElementById('address').value,
        coordinates: [
          document.getElementById('long').value,
          document.getElementById('lat').value,
        ],
        maps_url: document.getElementById('maps').value,
      })
    );
    form.append('phone', document.getElementById('phone').value);
    form.append(
      'available_wedding',
      document.getElementById('wedding').checked
    );
    form.append(
      'available_workshop',
      document.getElementById('workshop').checked
    );
    form.append(
      'available_library',
      document.getElementById('library').checked
    );
    form.append('desc_wedding', document.getElementById('descwedding').value);
    form.append('desc_workshop', document.getElementById('descworkshop').value);
    form.append('desc_library', document.getElementById('desclibrary').value);
    form.append('imageCover', document.getElementById('imageCover').files[0]);
    const images = document.getElementById('images').files;
    for (let i = 0; i < images.length; i++) {
      form.append('images', images[i]);
    }

    createMasjid(form);
  });
}

if (formUpdateMasjid) {
  formUpdateMasjid.addEventListener('submit', (e) => {
    e.preventDefault();
    // sama aja buat multipar/form-data
    const formU = new FormData();
    // const name = document.getElementById('name').value;
    // const shortName = document.getElementById('shortName').value;

    formU.append('name', document.getElementById('nameU').value);
    formU.append(
      'location',
      JSON.stringify({
        type: 'Point',
        address: document.getElementById('addressU').value,
        coordinates: [
          document.getElementById('longU').value,
          document.getElementById('latU').value,
        ],
        maps_url: document.getElementById('mapsU').value,
      })
    );
    formU.append('phone', document.getElementById('phoneU').value);
    formU.append(
      'available_wedding',
      document.getElementById('weddingU').checked
    );
    formU.append(
      'available_workshop',
      document.getElementById('workshopU').checked
    );
    formU.append(
      'available_library',
      document.getElementById('libraryU').checked
    );
    formU.append('desc_wedding', document.getElementById('descweddingU').value);
    formU.append(
      'desc_workshop',
      document.getElementById('descworkshopU').value
    );
    formU.append('desc_library', document.getElementById('desclibraryU').value);
    formU.append('imageCover', document.getElementById('imageCoverU').files[0]);
    const images = document.getElementById('imagesU').files;
    for (let i = 0; i < images.length; i++) {
      formU.append('images', images[i]);
    }
    for (var pair of formU.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    // console.log(document.getElementById('logo').files[0]);
    updateMasjid(formU, document.getElementById('masjidId').value);
  });
}

if (deleteButton) {
  deleteButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      deleteMasjid(button.dataset['id']);
    });
  });
}
if (editButton) {
  editButton.forEach((button) => {
    // console.log(button);
    button.addEventListener('click', (e) => {
      e.preventDefault();
      fillForm(button.dataset['id']);
    });
  });
}

// if (addResultButton) {
//   addResultButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       addResult(button.dataset['id']);
//     });
//   });
// }

// if (formAddPlayer) {
//   formAddPlayer.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const form = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;

//     form.append('nick', document.getElementById('nick').value);
//     form.append('idGame', document.getElementById('idGame').value);
//     form.append('name', document.getElementById('name').value);
//     form.append('instagram', document.getElementById('instagram').value);
//     form.append('photo', document.getElementById('photo').files[0]);
//     // console.log(document.getElementById('logo').files[0]);
//     createPlayer(form);
//   });
// }

// if (deletePlayerButton) {
//   deletePlayerButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       deletePlayer(button.dataset['id']);
//     });
//   });
// }

// if (formUpdateResult) {
//   formUpdateResult.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data

//     let winner = '';
//     let loser = '';
//     if (
//       document.getElementById('winner').value ==
//       document.getElementById('team1').value
//     ) {
//       winner = document.getElementById('team1').value;
//       loser = document.getElementById('team2').value;
//     } else {
//       winner = document.getElementById('team2').value;
//       loser = document.getElementById('team1').value;
//     }
//     const mvp = [
//       document.getElementById('mvp1').value,
//       document.getElementById('mvp2').value,
//     ];

//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;

//     const formR = {
//       win: winner,
//       lose: loser,
//       score: document.getElementById('score').value,
//       poinTimWin: document.getElementById('totalWinTimMenang').value,
//       poinTimLose: document.getElementById('totalWinTimKalah').value,
//       mvp,
//       finish: true,
//     };

//     updateResult(formR, document.getElementById('resultId').value);
//   });
// }

// if (buttonDetailPlayer) {
//   buttonDetailPlayer.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       detailPlayer(button.dataset['id']);
//     });
//   });
// }
// if (buttonResultDetail) {
//   buttonResultDetail.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       resultDetail(button.dataset['id']);
//     });
//   });
// }

// if (formAddStreamer) {
//   formAddStreamer.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const form = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;

//     form.append('photo', document.getElementById('photo').files[0]);
//     createStreamer(form);
//   });
// }
// if (deleteStreamerButton) {
//   deleteStreamerButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       deleteStreamer(button.dataset['id']);
//     });
//   });
// }
// if (formAddNews) {
//   formAddNews.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const form = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;

//     form.append('photo', document.getElementById('photo').files[0]);
//     createNews(form);
//   });
// }
// if (deleteNewsButton) {
//   deleteNewsButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       deleteNews(button.dataset['id']);
//     });
//   });
// }

if (btnLogout) {
  btnLogout.addEventListener('click', logout);
}

window.addEventListener('DOMContentLoaded', (event) => {
  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
});
