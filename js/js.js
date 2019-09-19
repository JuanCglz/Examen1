
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
function myFunctionHide() {
  var x = document.getElementById("seccion_comentario");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
$.ajax({
  url : 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type : 'GET',
  dataType : 'xml',
  success : function(data) {

    let newHtml = ''

    $(data).find("comment").each(function(event) {
      newHtml += `
        <div class="review">
          ${$(this).find("name").text()} 
          <br>
          ${getStarsSpans($(this).find("stars").text())}
          <br>
          ${$(this).find("text").text()}
        <div>`
    })

    $('#seccion_reviews').append(newHtml)
  },
  error : function(errorMsg) {
    console.log(errorMsg)
  }
})


/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
function myFunctionAppend() {
  let estrellas = $("input[name='rating']:checked").val();
  let newHtml = `
  <div class="review">
    ${document.getElementById("nombre").value}
    <br>
    ${getStarsSpans(estrellas)}
    <br>
    ${document.getElementById("comentario").innerHTML}
  <div>`;
  $('#seccion_reviews').append(newHtml)
}

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
function myFunctionErase() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("comentario").innerHTML = "";

}

/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
