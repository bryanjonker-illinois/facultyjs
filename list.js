function loadAll(url) {
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(res => res.json()).then(data => {
        createGrid(data.items);
    });
}

function createGrid(items) {
    var faculty = document.getElementById('ils-faculty-list')
    faculty.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
        let li = document.createElement('li');
        let htmlProfile = `<il-profile-card><img src="${items[i].image}" alt="">
<h2 class="heading"><a href="${items[i].externalurl}">${items[i].fullnamefirst}</a></h2>`;
        if (items[i].title && items[i].title != '') {
            htmlProfile += `<p>${items[i].title}</p>`;
        }
        if (items[i].department && items[i].department != '') {
            htmlProfile += `<p class="il-contact-department">${items[i].department}</p>`;
        }
        if (items[i].phone && items[i].phone != '') {
            htmlProfile += `<p class="il-contact-phone"><a href="tel:${items[i].phone}">${items[i].phone}</a></p>`;
        }
        if (items[i].email && items[i].email != '') {
            htmlProfile += `<p class="il-contact-email"><a href="mailto:${items[i].email}">${items[i].email}</a></p>`;
        }
        htmlProfile += '</il-profile-card>';
        li.innerHTML = htmlProfile;
        faculty.appendChild(li);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadAll(facultyurl);
});