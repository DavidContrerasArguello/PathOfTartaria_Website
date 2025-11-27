// Estilos para el modal de verificación de edad
const modalStyle = `
    #age-verification-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #age-verification-modal {
        background: linear-gradient(to right, #411414, #672626, #411414);
        border-radius: 15px;
        padding: 30px;
        width: 90%;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        position: relative;
        border: 2px solid #8f4747;
    }

    #age-verification-modal h2 {
        color: white;
        font-family: 'Madimi One', sans-serif;
        margin-bottom: 20px;
        font-size: 28px;
    }

    #age-verification-modal p {
        color: white;
        margin-bottom: 25px;
        font-family: 'Ojuju', sans-serif;
        font-size: 16px;
    }

    #age-verification-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    #age-input {
        padding: 12px 15px;
        border-radius: 5px;
        border: none;
        width: 120px;
        font-size: 18px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.9);
        color: #333;
    }

    #age-submit {
        padding: 12px 30px;
        background: linear-gradient(to bottom, #ddd, #bbb);
        border: none;
        border-radius: 15px 0 15px 0;
        color: #411414;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 16px;
        font-family: 'Madimi One', sans-serif;
    }

    #age-submit:hover {
        transform: translateY(-2px);
        background: linear-gradient(to bottom, #fff, #ddd);
    }

    #logo-container {
        text-align: center;
        margin-bottom: 20px;
    }

    #logo-container img {
        width: 120px;
        height: auto;
    }

    #age-error {
        color: #ff6b6b;
        font-size: 14px;
        margin-top: 10px;
        height: 20px;
    }

    @media only screen and (min-width: 768px) {
        #age-verification-modal {
            padding: 40px;
        }

        #age-verification-modal h2 {
            font-size: 32px;
        }

        #age-verification-modal p {
            font-size: 18px;
        }
    }
`;

// Función para crear y mostrar el modal de verificación de edad
function createAgeVerificationModal() {
    // Crear un elemento de estilo y añadirlo al head
    const styleElement = document.createElement('style');
    styleElement.textContent = modalStyle;
    document.head.appendChild(styleElement);

    // Crear elementos del modal
    const overlay = document.createElement('div');
    overlay.id = 'age-verification-overlay';

    const modal = document.createElement('div');
    modal.id = 'age-verification-modal';

    // Añadir logo
    const logoContainer = document.createElement('div');
    logoContainer.id = 'logo-container';

    const logoImg = document.createElement('img');
    logoImg.src = 'img/logo.png';
    logoImg.alt = 'Path of Tartaria Logo';

    logoContainer.appendChild(logoImg);
    modal.appendChild(logoContainer);

    // Añadir título y contenido
    const title = document.createElement('h2');
    title.textContent = 'Verificación de Edad';

    const description = document.createElement('p');
    description.textContent = 'Por favor, ingresa tu edad para acceder a Path of Tartaria';

    const errorMessage = document.createElement('div');
    errorMessage.id = 'age-error';

    // Crear formulario
    const form = document.createElement('form');
    form.id = 'age-verification-form';
    form.onsubmit = function(e) {
        e.preventDefault();
        validateAge();
    };

    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.id = 'age-input';
    ageInput.placeholder = 'Edad';
    ageInput.min = '1';
    ageInput.max = '120';
    ageInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'age-submit';
    submitButton.textContent = 'VERIFICAR';

    // Armar el modal
    form.appendChild(ageInput);
    form.appendChild(submitButton);

    modal.appendChild(title);
    modal.appendChild(description);
    modal.appendChild(form);
    modal.appendChild(errorMessage);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// Función para validar la edad ingresada
function validateAge() {
    const ageInput = document.getElementById('age-input');
    const errorMessage = document.getElementById('age-error');
    const age = parseInt(ageInput.value);

    if (isNaN(age) || age <= 0) {
        errorMessage.textContent = 'Por favor, ingresa una edad válida';
        return;
    }

    // Guardar en localStorage que ya se verificó la edad
    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('userAge', age);

    // Redirigir según la edad
    if (age >= 18) {
        closeModal('¡Bienvenido a Path of Tartaria!');
    } else if (age >= 13 && age <= 17) {
        closeModal('Redirigiendo a un sitio adecuado para tu edad...');
        setTimeout(() => {
            window.location.href = "https://www.lego.com/es-es";
        }, 1500);
    } else if (age >= 7 && age <= 12) {
        closeModal('Redirigiendo a un sitio adecuado para tu edad...');
        setTimeout(() => {
            window.location.href = "https://www.wizardingworld.com/collections/harry-potter";
        }, 1500);
    } else if (age >= 4 && age <= 6) {
        closeModal('Redirigiendo a un sitio adecuado para tu edad...');
        setTimeout(() => {
            window.location.href = "https://www.pocoyo.com/es";
        }, 1500);
    } else {
        closeModal('Redirigiendo a un sitio adecuado para tu edad...');
        setTimeout(() => {
            window.location.href = "https://www.dodot.es";
        }, 1500);
    }
}

// Función para cerrar el modal con un mensaje
function closeModal(message) {
    const modal = document.getElementById('age-verification-modal');
    const form = document.getElementById('age-verification-form');
    const errorMessage = document.getElementById('age-error');

    if (modal && form) {
        // Ocultar formulario y mostrar mensaje
        form.style.display = 'none';
        errorMessage.textContent = '';

        const successMessage = document.createElement('p');
        successMessage.style.color = '#8dff8d';
        successMessage.style.fontSize = '18px';
        successMessage.style.fontWeight = 'bold';
        successMessage.textContent = message;

        modal.appendChild(successMessage);

        // Si es un usuario adulto, cerrar después de un momento
        if (message === '¡Bienvenido a Path of Tartaria!') {
            setTimeout(() => {
                const overlay = document.getElementById('age-verification-overlay');
                if (overlay) {
                    overlay.style.transition = 'opacity 1s';
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                    }, 1000);
                }
            }, 1500);
        }
    }
}

// Función para reiniciar la verificación de edad (para pruebas)
function resetAgeVerification() {
    localStorage.removeItem('ageVerified');
    localStorage.removeItem('userAge');
    location.reload();
}

// Verificar edad al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si ya se verificó la edad
    const ageVerified = localStorage.getItem('ageVerified');

    if (!ageVerified) {
        createAgeVerificationModal();
    }

    // Crear botón oculto para reiniciar verificación (accesible desde la consola)
    // Esto facilita las pruebas durante el desarrollo
    window.resetAge = resetAgeVerification;
});