//JavaScript para crear componente de tarjetas de forma dinámica. 

// lista de productos

const productos = [
    {
    nombre: "VIOLÍN",
    imagen: "https://musicasatiendas.com/11241-large_default/kreutzer-school-violin-116.jpg",
    descripcion: "Violín completo completo con arco y estuche.",
    precio: 98.95,
    caracteristicas: "Violín Kreutzer School fabricado artesanalmente con maderas sólidas."
    },
    {
    nombre: "PIANO",
    imagen: "https://musicasatiendas.com/8635-large_default/yamaha-gb-1k-sc3-piano-de-cola-silent.jpg",
    descripcion: "YAMAHA GB-1K SC3 Piano de Cola SILENT.",
    precio: 17800.45,
    caracteristicas: "Piano de cola Yamaha con sistema silent incorporado. 151cm. Negro pulido."
    }
];

// Creación de constantes para luego trabajar con ellas, mediante las selección de du identificador

const contenedor = document.getElementById("contenedor-producto");
const modal = document.getElementById("modal");
const confirmar = document.getElementById("confirmar");
const cancelar = document.getElementById("cancelar");

// Función para generar dinámicamente el HTML

function crearTarjeta(producto) {
    const tarjeta = document.createElement('div'); // crear contenedor para tarjeta
    tarjeta.classList.add('tarjeta-producto'); // asignar una clase a la tarjeta

    // Estructura de la tarjeta que se añadirá al html. 
    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <p><strong>Precio: ${producto.precio}€</strong></p>
        <div class="botones">
            <div class="ver-mas">Ver más</div>
            <div class="comprar">Comprar</div>
        </div>
        <div class="formulario"> 
            <p>${producto.caracteristicas}</p>
            <form>
                <label>Cantidad:</label>
                <input type="number" class="cantidad" min="1" placeholder='0' required>
                <label class="total-label">Total:</label>
                <input type="text" class="precioTotal" readonly>
                <label>Método de pago:</label>
                <select required>
                    <option value="">Seleccione</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="paypal">Paypal</option>
                    <option value="bizum">Bizum</option>
                </select>
                <button type="submit">Confirmar</button>
            </form>
        </div>
    `;

    // Mostrar u ocultar el formulario
    const verMasBoton = tarjeta.querySelector('.ver-mas'); // busca botón a pulsar
    const formulario = tarjeta.querySelector('.formulario'); // busca lo que se mostrará al pulsar
    // llamada al hacer 'click' (pulsar) en "Ver más" se ejecutará una función
    verMasBoton.addEventListener('click',() => {
        // si el formulario se ve => cerrarlo y si no se ve => abrirlo
        formulario.style.display = formulario.style.display === 'block' ? 'none' : 'block';
    })
 

    // Validar formulario
    const form = formulario.querySelector('form'); // buscar formulario que hay que validar
    // código a ejecutar si se envía el formulario
    form.addEventListener('submit', (evento) =>{ // evento contiene la información sobre el evento
        evento.preventDefault(); // detener acción predeterminada para validar datos
        alert("Formulario válido. Puede realizar la compra");  // ventana emergente  de mensaje de éxito
    });

    // Abrir modal compra
    const comprarBoton = tarjeta.querySelector('.comprar');
    comprarBoton.addEventListener('click', () => { // cuando se pulsa el botón "Comprar"
        modal.style.display = 'flex'; // el modal se abre
    });
     
    // ✨ Total dinámico
    const cantidadInput = tarjeta.querySelector('.cantidad'); 
    const totalLabel = tarjeta.querySelector('.total-label');
    const precioTotalInput = tarjeta.querySelector('.precioTotal');

    totalLabel.style.display = 'none'; // no es visible
    precioTotalInput.style.display = 'none'; // no es visible

    function actualizarTotal() {  // función para calcular total
        const cantidad = parseInt(cantidadInput.value); // cadena de texto convertida a número entero par operar
        if (cantidad > 0) { // si la cantidad sea mayor a 0
            const total = (producto.precio * cantidad).toFixed(2); // cáclula el total con 2 decimales
            totalLabel.style.display = 'block'; // Total: será visible
            precioTotalInput.style.display = 'block'; // el precio total será visible
            precioTotalInput.value = `${total} €`; // valor del precio total 
           
        } else { // si no es mayor de 0
            totalLabel.style.display = 'none'; // no será visible Total:
            precioTotalInput.style.display = 'none'; // no será visible el precio total
            precioTotalInput.value = ""; // no tentrá valor el precio total
        }
    };

    // LLamada a la función actualizarTotal() cuando:
    cantidadInput.addEventListener('input', actualizarTotal); // se introduzaca una cantidad
    cantidadInput.addEventListener('change', actualizarTotal); // cuando cambie la cantidad

    contenedor.appendChild(tarjeta); // añade un nodo a la lista de hijos del padre (contenedor)
};


// Acciones de Modal
confirmar.addEventListener('click', () => { // si se pulsa el botón de confirmar compra
    alert("¡Compra confirmada!"); // ventana emergente de compra realizada
    modal.style.display = 'none'; // se cierra el modal
})

cancelar.addEventListener('click', () => {  // si se pulsa el botón de cancelar
    alert("¡Compra cancelada!"); // ventana que informa que la compra se ha cancelado
    modal.style.display = 'none'; // se cierra el modal
})

// Creación de tarjetas. Se va añadiendo un producto a la lista o array de productos
productos.forEach(crearTarjeta) ;




    
        
        