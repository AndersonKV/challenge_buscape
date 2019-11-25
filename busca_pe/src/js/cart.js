const containerRow = document.querySelector('.container-row');
const navCart = document.querySelectorAll('.nav-cart');
document.querySelector('.badge').innerHTML = navCart.length

//inicia a function para passar o addEventListner para os button
window.addEventListener("load", addEventos)

const shoppingCart = [];

(async function template() {

const modeloString = api.items.map(function(item, index) {
		const div = `
		<div class="container">
			<div class="row bg-cart" id="${index}">
				<div class="col-lg-2 col-md-2 col-sm-3 col-12 sub-images">
 				</div>

 				<div class="col-lg-5 col-md-5 col-sm-9 col-12" >
					<img class="img-fluid imagem-principal" src="${item.product.images[index]}" onerror="changePhotoError(this)">	    
				</div>

				<div class="col-lg-5 col-md-5 col-sm-12 col-12">

					<div>
						<h4>${item.product.name}</h4>
					</div>

					<div class="mt-5 price">
						<h5><span>10x R$${Math.floor(item.product.price.value / 10)}</span> ou <span>${item.product.price.value}</span> á vista</h5>
					</div>

					<div>
						<button id="${item.product.id}" type="button" class="btn-submit btn btn-success btn-lg btn-block">Adicionar ao carrinho</button>
					</div>

				</div>

			</div>
		</div>
					`
		return div
	})

	var div = document.createElement("div")
	//atrela div criada ao texto modeloString
	div.innerHTML = modeloString
	//anexa ao container
	containerRow.append(div)

	//importante as const no final para ser pego apenas quando for criado
	//a templete
	const bgCart = document.querySelectorAll('.bg-cart');
	const subImages = document.querySelectorAll('.sub-images');
	const error = 'https://miro.medium.com/max/3840/1*uRziGU1OJNWawGusbZLxvQ.png';

	//faz o loop nas sub imagens (cada item 4 fotos)
	for(i = 0; i < api.items.length; i++) {
		for(l = 0; l < subImages.length; l++){
			const images = `<img class="img-thumbnail img-grid" id="${api.items[i].product.id}" src="${api.items[i].product.images[l]}" onError="this.onerror=null;this.src='${error}';">`
			const divImages = document.createElement("div")
			divImages.innerHTML = images
			subImages[i].append(divImages)
			console.log(images[i].id)
 		}
	}

	console.log('template gerado com sucesso')

})();

function addEventos() {
	const gridImg = document.querySelectorAll('.img-grid');
	const btn = document.querySelectorAll('.btn-submit');
	const imagemPrincipal = document.querySelectorAll('.imagem-principal');

	//adiciona a function que troca a foto ao ser clicada
	for(i = 0; i < gridImg.length; i++) {
		gridImg[i].addEventListener("click", changePhoto)
	}
	//adiciona a function submit aos 4 button de cada bg-cart
	for(i = 0; i < btn.length; i++) {
			btn[i].addEventListener("click", submit)
	}

}

function changePhoto(event) {
	const imagem_principal = document.querySelectorAll('.imagem-principal');
	//pega a imagem principal, event é o id e troca pela img clicada
	//imagem[0].src
	imagem_principal[event.target.id].src = event.target.src;
}

function submit(event) {
	const navSubtotal = document.querySelector('.nav-subtotal')
	const subTotal = document.querySelector('.subtotal-preco')

	//verifica se o id do event bate com id da api e retorna
	let get = api.items.filter((item) => {
		return item.product.id == event.target.id;
	})
	//faz loop do cart nav
	const modeloNav = `<div class="container">
						<div class="row nav-cart mb-3">
						<div class="col-lg-3 col-md-3 col-sm-4 col-5">
							<img class="img-fluid imagem-principal" src="${get[0].product.images[0]}">	    
						</div>
						<div class="col-lg-6 col-md-7 col-sm-5 col price" >
							<h4 class="text-left">${get[0].product.name}</h4>
							<h5><span>10x R$${Math.floor(get[0].product.price.value / 10)}</span> ou <span>${get[0].product.price.value}</span> á vista</h5>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-12 col-12 btn-nav-del" >
							<button id="${get[0].product.id}" type="button" class="btn-delete btn btn-danger btn-lg btn-block" onclick="deleteItem(this)">X</button>
						</div>
					</div>
					</div>
					`;

	const divModeloNav = document.createElement("div")
	divModeloNav.innerHTML = modeloNav
	navSubtotal.insertBefore(divModeloNav, navSubtotal.childNodes[0]);

	text()
	btn(event)			
	console.log('item adicionado ao carrinho')

	const navCart = document.querySelectorAll('.nav-cart');
	//pega a classe badge e associa a quantidade de navCart
	document.querySelector('.badge').innerHTML = navCart.length
	const shoppingCart = [];
 
}

 
function text() {
	const subTotal = document.querySelector('.subtotal-preco')
	//event.target.id é o id do butto clicado
	//verifica se id existe e retorna o objeto dele
	let get = api.items.filter((item) => {
		return item.product.id == event.target.id;
	})

	var total = [];
	//adiciona o objeto retornado ao carrinho
	shoppingCart.push(get[0].product)
	//faz um loop adicionando a quantidade de item price ao const total
	for(i = 0; i < shoppingCart.length; i++) {
		total.push(shoppingCart[i].price.value)
	}

	//pega todos os items price do total e soma
	var totalFinal = total.reduce(function(anterior, atual) {
	  	  return parseFloat(anterior) + parseFloat(atual);
	});
	//valor total somado
	const num = Math.floor(totalFinal)

	const modeloBtn = `<div class="col nav-price">
							<h5><span>10x R$${num/10}</span> ou <span>${num}</span> á vista</h5>							
						</div>
						`;

	const divModeloBtn = document.createElement("div")
	subTotal.innerHTML = modeloBtn;
	//zera o total

	total = [];

}

function btn(event) {
	const subTotal = document.querySelector('.subtotal-preco')

	const modeloBtn = `
	<div class="col nav-btn-price">
		<button type="button" class="nav-btn btn btn-success" data-toggle="modal" data-target="#exampleModal">
 			Finalizar compra
		</button>

		<!-- Modal -->
		<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">
		        DEU TUDO CERTO, COMPRA FINALIZADA COM SUCESSO
		        </h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		 
		      <div class="modal-footer">
		        <button onclick=deleteAll(this) type="button" class="btn btn-success" data-dismiss="modal">Fechar</button>
		      </div>
		    </div>
		  </div>
		</div>
				
	</div>						
	`;

	const divModeloBtn = document.createElement("div")
	divModeloBtn.innerHTML = modeloBtn
	subTotal.appendChild(divModeloBtn)
}

function deleteItem(event) {
	const subTotal = document.querySelector('.subtotal-preco')
	const navPrice = document.querySelector('.nav-price')
	const navBtnPrice = document.querySelector('.nav-btn-price')

	let get = api.items.filter((item) => {
		return item.product.id == event.id;
	})

	var total = [];

	//console.log(get[0].product.id)

	//faz o loop e if para verifica se o id recuperado bate com o do carrinho
	//se sim, remove
	//segundo if é para caso ele não remova o ultimo item do array, ele remove
	let len = shoppingCart.length;

	for(i = 0; i < shoppingCart.length; i++) {
		if(get[0].product.id === shoppingCart[i].id){
			shoppingCart.pop();
			break;
		}	
	}
	if(len === shoppingCart.length){
		shoppingCart.pop();
	}
    

	//remove o a grid do item
	event.parentElement.parentElement.remove();
	//console.log(shoppingCart.length)

	for(i = 0; i < shoppingCart.length; i++) {
		total.push(shoppingCart[i].price.value)
	}	
	
	//soma o valor total e se o valor não existe retorna uma string vazia

	var totalFinal = total.length ? total.reduce(function(anterior, atual) {
	  	  return parseFloat(anterior) + parseFloat(atual);
	}) : '';

	const num = Math.floor(totalFinal)

	const modeloBtn = `<div class="col nav-price">
							<h5><span>10x R$${num/10}</span> ou <span>${num}</span> á vista</h5>							
						</div>
						`;

	const divModeloBtn = document.createElement("div")
	//se tive valor no totalFinal anexa modeloBtn, senão string vazia
	navPrice.innerHTML = totalFinal ? modeloBtn : '';

	if(shoppingCart.length == 0){
		navBtnPrice.remove();
	}

	total = [];

	console.log('item removido com sucesso')

	const navCart = document.querySelectorAll('.nav-cart');
	document.querySelector('.badge').innerHTML = navCart.length


}

function deleteAll(event) {
	const navCart = document.querySelectorAll('.nav-cart')
	const subTotal = document.querySelector('.subtotal-preco')

	//remove os item um-aum
	for(i=0;i<navCart.length;i++) {
		navCart[i].remove();
	}

	//preço
	subTotal.removeChild(subTotal.childNodes[0]); 
	//button
	subTotal.removeChild(subTotal.childNodes[1]); 

	//n igual a quantidade de items no shoppingCart
	const n = shoppingCart.length; 
	//remove item a item
	for(let i = 0; i < n; i++) { shoppingCart.pop() }
  
    document.querySelector('.badge').innerHTML = '0'

	console.log('compra finalizada e todos os items removidos do carrinho')

}

function changePhotoError(event) {
	const error = 'https://miro.medium.com/max/3840/1*uRziGU1OJNWawGusbZLxvQ.png'
	event.src = error;
}

