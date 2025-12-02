document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const resultsDiv = document.getElementById('formResults');
  
  const sliders = ['rating1', 'rating2', 'rating3'];
  sliders.forEach(id => {
    const slider = document.getElementById(id);
    const span = document.getElementById(id + 'Value');
    span.textContent = slider.value; 
    slider.addEventListener('input', () => {
      span.textContent = slider.value; 
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value.trim(),
      surname: document.getElementById('surname').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      rating1: Number(document.getElementById('rating1').value),
      rating2: Number(document.getElementById('rating2').value),
      rating3: Number(document.getElementById('rating3').value)
    };

    console.log('Form Data:', data);

    resultsDiv.innerHTML = ''; 
    for (const key in data) {
      const p = document.createElement('p');

      let label = key.replace(/([A-Z])/g, ' $1');
      label = label.charAt(0).toUpperCase() + label.slice(1);
      p.textContent = `${label}: ${data[key]}`;
      resultsDiv.appendChild(p);
    }

    const average = (data.rating1 + data.rating2 + data.rating3) / 3;
    const avgRounded = Math.round(average * 10) / 10; 

    const avgP = document.createElement('p');
    avgP.textContent = `${data.name} ${data.surname}: ${avgRounded}`;
    
    if (avgRounded >= 0 && avgRounded < 4) {
        avgP.style.color = 'red';
    } else if (avgRounded >= 4 && avgRounded < 7) {
        avgP.style.color = 'orange';
    } else if (avgRounded >= 7 && avgRounded <= 10) {
        avgP.style.color = 'green';
    }

    resultsDiv.appendChild(avgP);

    function showPopup(message) {
        let popup = document.getElementById('formPopup');

        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'formPopup';
            document.body.appendChild(popup);
        }

        popup.textContent = message;
        popup.style.display = 'block';

        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }

    showPopup('Form submitted successfully!');

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  });
});
