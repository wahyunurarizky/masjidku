/* eslint-disable */

import axios from 'axios';
const btnCreate = document.querySelector('.btn-create');
const btnUpdate = document.querySelector('.btn-update');

export const createMasjid = async (data) => {
  btnCreate.innerHTML = 'loading...';
  console.log(data);
  try {
    const url = '/api/v1/masjid';

    const res = await axios({
      method: 'post',
      url,
      data,
    });

    if (res.data.status === 'success') {
      alert('successfull');
      location.reload();
    }
    btnCreate.innerHTML = 'Tambah';
  } catch (err) {
    btnCreate.innerHTML = 'Tambah';
    alert(err.response.data.message);
  }
};

export const deleteMasjid = async (id) => {
  if (!confirm('yakin?')) {
    return;
  }

  try {
    const url = `/api/v1/masjid/${id}`;

    await axios({
      method: 'delete',
      url,
    });

    alert('successfull');
    location.reload();
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const fillForm = async (id) => {
  try {
    const url = `/api/v1/masjid/${id}`;

    const resGet = await axios({
      method: 'get',
      url,
    });

    const masjid = resGet.data.data.doc;

    document.getElementById('masjidId').value = masjid._id;
    document.getElementById('nameU').value = masjid.name;
    document.getElementById('addressU').value = masjid.location.address;
    document.getElementById('latU').value = masjid.location.coordinates[1];
    document.getElementById('longU').value = masjid.location.coordinates[0];
    document.getElementById('mapsU').value = masjid.location.maps_url;
    document.getElementById('phoneU').value = masjid.phone;
    document.getElementById('descweddingU').value = masjid.desc_wedding;
    document.getElementById('descworkshopU').value = masjid.desc_workshop;
    document.getElementById('desclibraryU').value = masjid.desc_library;
    if (masjid.available_wedding)
      document.getElementById('weddingU').checked = true;
    if (masjid.available_workshop)
      document.getElementById('workshopU').checked = true;
    if (masjid.available_library)
      document.getElementById('libraryU').checked = true;
    // document
    //   .querySelector('.img-logo')
    //   .setAttribute('src', `/img/masjids/${masjid.logo}`);
    // document.getElementById('logoU').value = team.logo;
  } catch (err) {
    alert(err);
  }
};

export const updateMasjid = async (data, masjidId) => {
  btnUpdate.innerHTML = 'loading...';

  try {
    const url = `/api/v1/masjid/${masjidId}`;

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      alert('successfull');
      location.reload();
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
