var $container = $('#container');

$.Isotope.prototype._getCenteredMasonryColumns = function() {
	this.width = this.element.width();

	var parentWidth = this.element.parent().width();

	// i.e. options.masonry && options.masonry.columnWidth
	var colW = this.options.masonry && this.options.masonry.columnWidth ||
		// or use the size of the first item
		this.$filteredAtoms.outerWidth(true) ||
		// if there's no items, use size of container
		parentWidth;

	var cols = Math.floor( parentWidth / colW );
	cols = Math.max( cols, 1 );

	// i.e. this.masonry.cols = ....
	this.masonry.cols = cols;
	// i.e. this.masonry.columnWidth = ...
	this.masonry.columnWidth = colW;
};
  
$.Isotope.prototype._masonryReset = function() {
	// layout-specific props
	this.masonry = {};
	// FIXME shouldn't have to call this again
	this._getCenteredMasonryColumns();
	var i = this.masonry.cols;
	this.masonry.colYs = [];
	while (i--) {
		this.masonry.colYs.push( 0 );
	}
};

$.Isotope.prototype._masonryResizeChanged = function() {
	var prevColCount = this.masonry.cols;
	// get updated colCount
	this._getCenteredMasonryColumns();
	return ( this.masonry.cols !== prevColCount );
};
  
$.Isotope.prototype._masonryGetContainerSize = function() {
	var unusedCols = 0,
	i = this.masonry.cols;
	// count unused columns
	while ( --i ) {
		if ( this.masonry.colYs[i] !== 0 ) {
			break;
		}
		unusedCols++;
	}
	return {
		height : Math.max.apply( Math, this.masonry.colYs ),
		// fit container to columns that have been used;
		width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
	};
};

$container.isotope({
	itemSelector : '.element',
	masonry : {
		columnWidth : 270
	}
});

function Ficha(data) {
	this.taxonnombre = data.taxonnombre;
	this.idCatalogo = data.idCatalogo;
	this.autor = data.autor;
	this.imagenes = data.imagenes;
	this.numeroFichaCarrusel = data.numero;
	this.taxoncompleto = data.taxoncompleto;
	this.nombresComunes = data.nombresComunes;
	this.organizaciones = data.organizaciones;
	this.departamentos = data.departamentos;
	this.contenidoNubePalabras = data.contenidoNubePalabras;

	this.idFichaTag = ko.computed(function() {
		return 'ficha' + this.idCatalogo;
	}, this);
		
	this.textoNombresComunes = ko.computed(function() {
		var textoNombresComunes = "";
		for(var i in this.nombresComunes()) {
			textoNombresComunes = textoNombresComunes + this.nombresComunes()[i].tesauroNombre + (parseInt(i)<(this.nombresComunes().length-1)?', ':'.');
		}
		return textoNombresComunes;
	}, this);

	this.textoDepartamentos = ko.computed(function() {
		var textoDepartamentos = "";
		for(var i in this.departamentos()) {
			textoDepartamentos = textoDepartamentos + this.departamentos()[i].nombre + (parseInt(i)<(this.departamentos().length-1)?', ':'.');
		}
		return textoDepartamentos;
	}, this);

	this.imagenThumb140 = ko.computed(function() {
		return this.imagenes()[Math.floor(Math.random()*this.imagenes().length)];
	}, this);

	this.imagenThumb270 = ko.computed(function() {
		return this.imagenes()[Math.floor(Math.random()*this.imagenes().length)];
	}, this);

	this.imageToUse = ko.computed(function() {
		if(this.imagenes().length == 0) {
			var image = new Object();
			image.urlImagen270 = "data:image/png;base64,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";
			return image;
		} else {
			return this.imagenes()[Math.floor(Math.random()*this.imagenes().length)];
		}
	}, this);
}

function NombreComun(data) {
	this.tesauroNombre = data.tesauroNombre;
}

function Imagen(data) {
	this.urlImagen140 = data.urlImagen140;
	this.urlImagen270 = data.urlImagen270;
}

function Organizacion(data) {
	this.nombre = data.nombre;
}

function Departamento(data) {
	this.nombre = data.nombre;
}

// Filter data
function Filter(data) {
	this.subject = data.subject;
	this.predicate = data.predicate;
	this.objectName = data.objectName;
}

function FichasCarruselViewModel() {
	var self = this;
	self.fichasCarrusel = ko.observableArray([]);
	self.newFichaCarruselNombreCientifico = ko.observable();
	self.numeroFichaCarrusel = 0;

	self.addFichaCarrusel = function() {
		self.numeroFichaCarrusel++;
		self.fichasCarrusel.push(new Ficha({taxonnombre: this.newFichaCarruselNombreCientifico(), numero: this.numeroFichaCarrusel}));
		$("a[data-toggle=popover]").popover();
	};

	self.removeFichaCarrusel = function(ficha) {
		self.fichasCarrusel.remove(ficha);
	};

	self.showFichaElement = function(elem) {
		if (elem.nodeType === 1)
			$(elem).fadeIn();
	};

	$.ajax({
		url: "http://admin.catalogo.local/index.php/api/fichas/carrusel?count=6",
		type: 'GET',
		dataType: "jsonp",
		success: function(data) {
			for(var i in data) {
				self.numeroFichaCarrusel++;
				this.imagenes = ko.observableArray([]);
				for(var imagen in data[i].atributos.ImagenThumb140) {
					this.imagenes.push(new Imagen({urlImagen140: data[i].atributos.ImagenThumb140[imagen]}));
				}
				this.nombresComunes = ko.observableArray([]);
				for(var nombreComun in data[i].nombres_comunes) {
					this.nombresComunes.push(new NombreComun({tesauroNombre: data[i].nombres_comunes[nombreComun].tesauronombre}));
				}
				this.departamentos = ko.observableArray([]);
				self.fichasCarrusel.push(new Ficha({taxonnombre: data[i].info_taxonomica.taxonnombre, idCatalogo: data[i].catalogoespecies_id, numero: self.numeroFichaCarrusel, imagenes: this.imagenes, nombresComunes: this.nombresComunes, departamentos: this.departamentos}));
				$("a[data-toggle=popover]").popover();
			}
		}
	});
}

function RecordsWallViewModel() {
	var self = this;
	self.currentPage = ko.observable(2);
	self.recordsWall = ko.observableArray([]);

	// FichaCarrusel variables
	self.fichasCarrusel = ko.observableArray([]);
	self.newFichaCarruselNombreCientifico = ko.observable();
	self.numeroFichaCarrusel = 0;

	// FichaCarrusel operations
	self.addFichaCarrusel = function() {
		self.numeroFichaCarrusel++;
		self.fichasCarrusel.push(new Ficha({taxonnombre: this.newFichaCarruselNombreCientifico(), numero: this.numeroFichaCarrusel}));
		$("a[data-toggle=popover]").popover();
	};

	self.removeFichaCarrusel = function(ficha) {
		self.fichasCarrusel.remove(ficha);
	};

	self.showFichaElement = function(elem) {
		if (elem.nodeType === 1)
			$(elem).fadeIn();
	};

	$.ajax({
		url: "http://admin.catalogo.local/index.php/api/fichas/carrusel?count=6",
		type: 'GET',
		dataType: "jsonp",
		success: function(data) {
			for(var i in data) {
				self.numeroFichaCarrusel++;
				this.imagenes = ko.observableArray([]);
				for(var imagen in data[i].atributos.ImagenThumb140) {
					this.imagenes.push(new Imagen({urlImagen140: data[i].atributos.ImagenThumb140[imagen]}));
				}
				this.nombresComunes = ko.observableArray([]);
				for(var nombreComun in data[i].nombres_comunes) {
					this.nombresComunes.push(new NombreComun({tesauroNombre: data[i].nombres_comunes[nombreComun].tesauronombre}));
				}
				this.departamentos = ko.observableArray([]);
				self.fichasCarrusel.push(new Ficha({taxonnombre: data[i].info_taxonomica.taxonnombre, idCatalogo: data[i].catalogoespecies_id, numero: self.numeroFichaCarrusel, imagenes: this.imagenes, nombresComunes: this.nombresComunes, departamentos: this.departamentos}));
				$("a[data-toggle=popover]").popover();
			}
		}
	});
	// End fichascarrusel operations
	
	// Filter status variables
	self.currentGroupActive = ko.observable("Todos");
	self.currentGeneralFilter = ko.observable("Todas");
	self.currentOrderBy = ko.observable("Fecha publicación");
	self.currentOrderDirection = ko.observable("Descendente");

	self.changeSearchCondition = function(data, event) {
		switch (event.currentTarget.innerText) {
			case "Todos":
				self.currentGroupActive("Todos");
				break;
			case "Insectos":
				self.currentGroupActive("Insectos");
				break;
			case "Aves":
				self.currentGroupActive("Aves");
				break;
			case "Plantas":
				self.currentGroupActive("Plantas");
				break;
			case "Mamíferos":
				self.currentGroupActive("Mamíferos");
				break;
			case "Reptiles":
				self.currentGroupActive("Reptiles");
				break;
			case "Peces":
				self.currentGroupActive("Peces");
				break;
			case "Hongos":
				self.currentGroupActive("Hongos");
				break;
			case "Todas":
				self.currentGeneralFilter("Todas");
				break;
			case "Solo fichas con imagenes":
				self.currentGeneralFilter("Solo fichas con imagenes");
				break;
			case "Fecha publicación":
				self.currentOrderBy("Fecha publicación");
				break;
			case "Nombre científico":
				self.currentOrderBy("Nombre científico");
				break;
			case "Autor":
				self.currentOrderBy("Autor");
				break;
			case "Ascendente":
				self.currentOrderDirection("Ascendente");
				break;
			case "Descendente":
				self.currentOrderDirection("Descendente");
				break;
		}
	}

	self.removeFichaMuro = function(record) {
		self.recordsWall.remove(record);
	};

	self.urlSearch = ko.computed(function() {
		var url = "http://admin.catalogo.local/index.php/api/fichas?";
		// Add page to search
		url = url+"page="+self.currentPage();
		if(self.currentGroupActive() == "Insectos") {
			url = url+"&taxon=insecta";
		} else if(self.currentGroupActive() == "Aves") {
			url = url+"&taxon=aves";
		} else if(self.currentGroupActive() == "Plantas") {
			url = url+"&taxon=plantae";
		} else if(self.currentGroupActive() == "Mamíferos") {
			url = url+"&taxon=mammalia";
		} else if(self.currentGroupActive() == "Reptiles") {
			url = url+"&taxon=reptilia";
		} else if(self.currentGroupActive() == "Peces") {
			url = url+"&taxon=amphibia";
		} else if(self.currentGroupActive() == "Hongos") {
			url = url+"&taxon=fungi";
		}
		if(self.currentGeneralFilter() == "Solo fichas con imagenes") {
			url = url+"&onlyimages=true";
		}
		if(self.currentOrderBy() == "Nombre científico") {
			url = url+"&order=scientificname";
		} else if(self.currentOrderBy() == "Autor") {
			url = url+"&order=author";
		}
		if(self.currentOrderDirection() == "Ascendente") {
			url = url+"&orderdirection=asc";
		}
		return url;
	}, this);

	self.textCommonName = function(arrayCommonName) {
		var textoNombresComunes = "";
		for(var i in arrayCommonName) {
			textoNombresComunes = textoNombresComunes + arrayCommonName[i].tesauroNombre + (parseInt(i)<(arrayCommonName.length-1)?', ':'.');
		}
		return textoNombresComunes;
	};

	self.textDepartments = function(arrayDepartments) {
		var textoDepartamentos = "";
		for(var i in arrayDepartments) {
			textoDepartamentos = textoDepartamentos + arrayDepartments[i].nombre + (parseInt(i)<(arrayDepartments.length-1)?', ':'.');
		}
		return textoDepartamentos;
	};

	self.imageToUse = function(images, taxon) {
		if(images.length == 0) {
			var image = new Object();
			var pattern = /Reino\s\w*/i;
			if(pattern.exec(taxon) !== null) {
				var taxonKingdom = pattern.exec(taxon)[0].replace("Reino","").replace(" ", "");	
			} else {
				var taxonKingdom = "";
			}
			var pattern = /Phylum\s\w*/i;
			if(pattern.exec(taxon) !== null) {
				var taxonPhylum = pattern.exec(taxon)[0].replace("Phylum","").replace(" ", "");
			} else {
				var taxonPhylum = "";
			}
			var pattern = /Clase\s\w*/i;
			if(pattern.exec(taxon) !== null) {
				var taxonClass = pattern.exec(taxon)[0].replace("Clase","").replace(" ", "");
			} else {
				var taxonClass = "";
			}
			var pattern = /Orden\s\w*/i;
			if(pattern.exec(taxon) !== null) {
				var taxonOrder = pattern.exec(taxon)[0].replace("Orden","").replace(" ", "");
			} else {
				var taxonOrder = "";
			}
			var pattern = /Familia\s\w*/i;
			if(pattern.exec(taxon) !== null) {
				var taxonFamily = pattern.exec(taxon)[0].replace("Familia","").replace(" ", "");
			} else {
				var taxonFamily = "";
			}
			var pattern = /Género\s\w*/i;
			if(pattern.exec(taxon) !== null) {
				var taxonGenus = pattern.exec(taxon)[0].replace("Género","").replace(" ", "");
			} else {
				var taxonGenus = "";
			}
			var pattern = /Especie\s\w*/i;
			if(pattern.exec(taxon) !== null) {
				var taxonSpecie = pattern.exec(taxon)[0].replace("Especie","").replace(" ", "");
			} else {
				var taxonSpecie = "";
			}
			if(taxonKingdom == "Animalia" && taxonClass == "Aves") {
				image.urlImagen270 = "/images/taxon_icons/aves2.png";
			} else if(taxonKingdom == "Animalia" && taxonClass == "Reptilia") {
				image.urlImagen270 = "/images/taxon_icons/reptiles2.png";
			} else if(taxonKingdom == "Animalia" && (taxonClass == "Mammalia" || taxonClass == "Mamalia")) {
				image.urlImagen270 = "/images/taxon_icons/mamiferos2.png";
			} else if(taxonKingdom == "Animalia" && taxonClass == "Insecta") {
				image.urlImagen270 = "/images/taxon_icons/insectos2.png";
			} else if(taxonKingdom == "Plantae") {
				image.urlImagen270 = "/images/taxon_icons/plantas2.png";
			} else if(taxonKingdom == "Fungi") {
				image.urlImagen270 = "/images/taxon_icons/hongos2.png";
			} else if(taxonKingdom == "Animalia" && taxonClass == "Amphibia") {
				image.urlImagen270 = "/images/taxon_icons/peces2.png";
			} else {
				image.urlImagen270 = 'data:image/png;base64,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';
			}
			return image;
		} else {
			return images[Math.floor(Math.random()*images.length)];
		}
	};

	$.ajax({
		url: "http://admin.catalogo.local/index.php/api/fichas?page=1",
		type: 'GET',
		dataType: "jsonp",
		beforeSend: function() {
			$('#messageAndAlert').css({display: 'block'});
			$("#messageAndAlert").addClass("loading");
		},
		complete: function() {
			$("#messageAndAlert").removeClass("loading");
			$('#messageAndAlert').css({display: 'none'});
			setTimeout(function() {
				$container.isotope('reLayout');
				$container.infinitescroll({
					dataType: "json",
					debug: false,
					appendCallback: false,
					navSelector  : '.navigation',
					nextSelector : '.navigation a'
				},	function(data, opts) {
						var page = opts.state.currPage;
						self.currentPage(page+1);
						for(var i in data) {
							this.imagenes = ko.observableArray([]);
							if(data[i].atributos !== undefined) {
								for(var imagen in data[i].atributos.ImagenThumb270) {
									this.imagenes.push(new Imagen({urlImagen270: data[i].atributos.ImagenThumb270[imagen]}));
								}
							}
							this.nombresComunes = ko.observableArray([]);
							for(var nombreComun in data[i].nombres_comunes) {
								this.nombresComunes.push(new NombreComun({tesauroNombre: data[i].nombres_comunes[nombreComun].tesauronombre}));
							}
							this.departamentos = ko.observableArray([]);
							if(data[i].distribucion_geografica !== undefined) {
								for(var departamento in data[i].distribucion_geografica.departamentos) {
									this.departamentos.push(new Departamento({nombre: data[i].distribucion_geografica.departamentos[departamento]}));
								}
								this.organizaciones = ko.observableArray([]);
								for(var organizacion in data[i].distribucion_geografica.organizaciones) {
									this.organizaciones.push(new Organizacion({nombre: data[i].distribucion_geografica.organizaciones[organizacion]}));
								}
							}
							self.recordsWall.push(new Ficha({idCatalogo: data[i].catalogoespecies_id, taxonnombre: data[i].info_taxonomica.taxonnombre.replace(/<[^>]*>?/gm, ''), autor: data[i].info_taxonomica.autor, taxoncompleto: data[i].info_taxonomica.taxoncompleto, imagenes: this.imagenes, nombresComunes: this.nombresComunes, organizaciones: this.organizaciones, departamentos: this.departamentos}));
							$container.isotope('insert', $('<div class="element ficha"><a href="#"><img src="'+self.imageToUse(this.imagenes(), data[i].info_taxonomica.taxoncompleto).urlImagen270+'"></a><div class="ficha-muro-datos"><div class="ficha-muro-taxonnombre"><span>'+data[i].info_taxonomica.taxonnombre.replace(/<[^>]*>?/gm, '')+'</span></div><div class="ficha-muro-autor"><span>'+data[i].info_taxonomica.autor+'</span></div><div class="ficha-muro-taxoncompleto"><span>'+data[i].info_taxonomica.taxoncompleto+'</span></div><div class="ficha-muro-nombrescomunes"><strong>Nombres comunes:</strong> <span>'+self.textCommonName(this.nombresComunes())+'</span></div><div class="ficha-muro-departamentos"><strong>Departamentos:</strong> <span>'+self.textDepartments(this.departamentos())+'</span></div></div></div>'));
							setTimeout(function() {
								$container.isotope('reLayout');
							}, 0);
						}
					}
				);
			}, 300);
		},
		success: function(data) {
			for(var i in data) {
				this.imagenes = ko.observableArray([]);
				if(data[i].atributos !== undefined) {
					for(var imagen in data[i].atributos.ImagenThumb270) {
						this.imagenes.push(new Imagen({urlImagen270: data[i].atributos.ImagenThumb270[imagen]}));
					}
				}
				this.nombresComunes = ko.observableArray([]);
				for(var nombreComun in data[i].nombres_comunes) {
					this.nombresComunes.push(new NombreComun({tesauroNombre: data[i].nombres_comunes[nombreComun].tesauronombre}));
				}
				if(data[i].distribucion_geografica !== undefined) {
					this.departamentos = ko.observableArray([]);
					for(var departamento in data[i].distribucion_geografica.departamentos) {
						this.departamentos.push(new Departamento({nombre: data[i].distribucion_geografica.departamentos[departamento]}));
					}
					this.organizaciones = ko.observableArray([]);
					for(var organizacion in data[i].distribucion_geografica.organizaciones) {
						this.organizaciones.push(new Organizacion({nombre: data[i].distribucion_geografica.organizaciones[organizacion]}));
					}
				}
				self.recordsWall.push(new Ficha({idCatalogo: data[i].catalogoespecies_id, taxonnombre: data[i].info_taxonomica.taxonnombre.replace(/<[^>]*>?/gm, ''), autor: data[i].info_taxonomica.autor, taxoncompleto: data[i].info_taxonomica.taxoncompleto, imagenes: this.imagenes, nombresComunes: this.nombresComunes, organizaciones: this.organizaciones, departamentos: this.departamentos}));
				$container.isotope('insert', $('<div class="element ficha"><a href="#"><img src="'+self.imageToUse(this.imagenes(), data[i].info_taxonomica.taxoncompleto).urlImagen270+'"></a><div class="ficha-muro-datos"><div class="ficha-muro-taxonnombre"><span>'+data[i].info_taxonomica.taxonnombre.replace(/<[^>]*>?/gm, '')+'</span></div><div class="ficha-muro-autor"><span>'+data[i].info_taxonomica.autor+'</span></div><div class="ficha-muro-taxoncompleto"><span>'+data[i].info_taxonomica.taxoncompleto+'</span></div><div class="ficha-muro-nombrescomunes"><strong>Nombres comunes:</strong> <span>'+self.textCommonName(this.nombresComunes())+'</span></div><div class="ficha-muro-departamentos"><strong>Departamentos:</strong> <span>'+self.textDepartments(this.departamentos())+'</span></div></div></div>'));
			}
		}
	});
}

//ko.applyBindings(new FichasCarruselViewModel(), $("#carruselSection")[0]);
ko.applyBindings(new RecordsWallViewModel(), $("#top-zone")[0]);

// Enable Isotope fluid layout
/*$(function(){
	var $container = $('#container');

	$container.isotope({
		itemSelector : '.element',
		masonry : {
			columnWidth : 270
		},
	});
});*/