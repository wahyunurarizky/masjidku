import axios from 'axios';
const btnCreate = document.querySelector('.btn-create');

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
    const url = `/api/v1/teams/${id}`;

    const resGet = await axios({
      method: 'get',
      url,
    });

    const team = resGet.data.data.doc;

    document.getElementById('teamId').value = team._id;
    document.getElementById('nameU').value = team.name;
    document.getElementById('shortNameU').value = team.shortName;
    document.getElementById('achievementU').value = team.achievement;
    document.getElementById('descriptionU').value = team.description;
    document
      .querySelector('.img-logo')
      .setAttribute('src', `/img/teams/${team.logo}`);
    // document.getElementById('logoU').value = team.logo;
  } catch (err) {
    alert(err);
  }
};

export const updateTeam = async (data, teamId) => {
  teamId;
  try {
    const url = `/api/v1/teams/${teamId}`;

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
