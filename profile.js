function loadAll(url, name, mult) {
    var fullUrl = mult >= 0 ? url + '&username=' + name : url + '?username=' + name 
    fetch(fullUrl, {
        method: 'GET',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(res => res.json()).then(data => {
        createProfile(data);
    });
}

function createProfile(item) {
    var faculty = document.getElementById('ils-faculty-profile')
    faculty.innerHTML = '';
    let profile = document.createElement('il-profile');
    let primaryAppointment = item.appointments[0];
    let htmlProfile = `<section slot="primary">
    <h1>${item.fullnamefirst}</h1>`;
    htmlProfile += `<p>${primaryAppointment.title}</p>
    <p class="il-contact-department">${primaryAppointment.department}</p>`;
    htmlProfile += '</section>';
    htmlProfile += `<section slot="contact">
    <img src="${item.image}" alt="">
    <h2>Contact Information</h2>
    <div class="il-contact-address">
        <p>${primaryAppointment.room} ${primaryAppointment.building}</p>
        <p>${primaryAppointment.address}</p>
        <p>${primaryAppointment.cityStateZip}</p>
    </div>`;
    if (primaryAppointment.phone && primaryAppointment.phone != '') {
        htmlProfile += `<p class="il-contact-phone"><a href="tel:${primaryAppointment.phone}">${primaryAppointment.phone}</a></p>`;
    }
    htmlProfile += `<p class="il-contact-email"><a href="mailto:${item.email}">${item.email}</a></p>`;
    htmlProfile += `<p class="il-contact-website"><a href="${item.expertsurl}">Illinois Experts</a></p>`;
    if (item.links != null && item.links.length > 0) {
        item.links.forEach(link => { htmlProfile += `<p class="il-contact-website"><a href="${link.url}">${link.name}</a></p>`; });
    }
    htmlProfile += `</section>`;

    if (item.biography != null && item.biography != '') {
        htmlProfile += `<section><h2>Biography</h2>${item.biography}</section>`;
    }

    if (item.backgrounds != null && item.backgrounds.length > 0) {
        htmlProfile += `<section><h2>Key Professional Appointments</h2><ul>`;
        item.backgrounds.forEach(background => { htmlProfile += `<li>${background.item}</li>`; });
        htmlProfile += `</ul></section>`;
    }

    if (item.history != null && item.history.length > 0) {
        htmlProfile += `<section><h2>Education</h2><ul>`;
        item.history.forEach(h => { htmlProfile += `<li>${h.item}</li>`; });
        htmlProfile += `</ul></section>`;
    }

    if (item.awards != null && item.awards.length > 0) {
        htmlProfile += `<section><h2>Awards, Honors, and Associations</h2><ul>`;
        item.awards.forEach(award => { htmlProfile += `<li>${award.item}</li>`; });
        htmlProfile += `</ul></section>`;
    }

    if (item.research != null && item.research != '') {
        htmlProfile += `<section><h2>Research and Service</h2>${item.research}</section>`;
    }

    if (item.publications != null && item.publications.length > 0) {
        htmlProfile += `<section><h2>Publications</h2><ul>`;
        item.publications.forEach(publication => { htmlProfile += `<li>${publication.name}</li>`; });
        htmlProfile += `</ul></section>`;
    }

    if (item.courses != null && item.courses.length > 0) {
        htmlProfile += `<section><h2>Courses</h2><ul>`;
        item.courses.forEach(course => { htmlProfile += `<li>${course.name} : ${course.description}</li>`; });
        htmlProfile += `</ul></section>`;
    }

    profile.innerHTML = htmlProfile;
    faculty.appendChild(profile);
}

window.addEventListener('DOMContentLoaded', () => {
    const search = new URLSearchParams(document.location.search);
    const mult = window.location.href.indexOf('?');
    loadAll(facultyprofileurl, search.get('username'), mult);
});