// Models
function CatalogRecord(data) {
	this.atributos = data.atributos;
	this.catalogoespecies_id = data.catalogoespecies_id;
	this.citacion = data.citacion;
	this.citacion_id = data.citacion_id;
	this.contacto = data.contacto;
	this.contacto_id = data.contacto_id;
	this.distribucion_geografica = data.distribucion_geografica;
	this.fechaactualizacion = data.fechaactualizacion;
	this.fechaelaboracion = data.fechaelaboracion;
	this.info_taxonomica = data.info_taxonomica;
	this.autor = data.autor;
	this.catalogoespecies_id = data.catalogoespecies_id;
	this.paginaweb = data.paginaweb;
	this.taxoncompleto = data.taxoncompleto;
	this.taxonnombre = data.taxonnombre;
	this.jerarquianombrescomunes = data.jerarquianombrescomunes;
	this.nombres_comunes = data.nombres_comunes;
	this.titulometadato = data.titulometadato;
	this.verificacion = data.verificacion;
}

function CatalogRecordViewModel() {
	var self = this;

	this.imageToUse = ko.computed(function() {
		if(regData.atributos.Imagen !== undefined) {
			return regData.atributos.Imagen[Math.floor(Math.random()*regData.atributos.Imagen.length)];
		} else {
			var pattern = /Reino\s\w*/i;
			if(pattern.exec(regData.info_taxonomica.taxoncompleto) !== null) {
				var taxonKingdom = pattern.exec(regData.info_taxonomica.taxoncompleto)[0].replace("Reino","").replace(" ", "");	
			} else {
				var taxonKingdom = "";
			}
			var pattern = /Phylum\s\w*/i;
			if(pattern.exec(regData.info_taxonomica.taxoncompleto) !== null) {
				var taxonPhylum = pattern.exec(regData.info_taxonomica.taxoncompleto)[0].replace("Phylum","").replace(" ", "");
			} else {
				var taxonPhylum = "";
			}
			var pattern = /Clase\s\w*/i;
			if(pattern.exec(regData.info_taxonomica.taxoncompleto) !== null) {
				var taxonClass = pattern.exec(regData.info_taxonomica.taxoncompleto)[0].replace("Clase","").replace(" ", "");
			} else {
				var taxonClass = "";
			}
			var pattern = /Orden\s\w*/i;
			if(pattern.exec(regData.info_taxonomica.taxoncompleto) !== null) {
				var taxonOrder = pattern.exec(regData.info_taxonomica.taxoncompleto)[0].replace("Orden","").replace(" ", "");
			} else {
				var taxonOrder = "";
			}
			var pattern = /Familia\s\w*/i;
			if(pattern.exec(regData.info_taxonomica.taxoncompleto) !== null) {
				var taxonFamily = pattern.exec(regData.info_taxonomica.taxoncompleto)[0].replace("Familia","").replace(" ", "");
			} else {
				var taxonFamily = "";
			}
			var pattern = /Género\s\w*/i;
			if(pattern.exec(regData.info_taxonomica.taxoncompleto) !== null) {
				var taxonGenus = pattern.exec(regData.info_taxonomica.taxoncompleto)[0].replace("Género","").replace(" ", "");
			} else {
				var taxonGenus = "";
			}
			var pattern = /Especie\s\w*/i;
			if(pattern.exec(regData.info_taxonomica.taxoncompleto) !== null) {
				var taxonSpecie = pattern.exec(regData.info_taxonomica.taxoncompleto)[0].replace("Especie","").replace(" ", "");
			} else {
				var taxonSpecie = "";
			}
			if(taxonKingdom == "Animalia" && taxonClass == "Aves") {
				image = "/images/taxon_icons/aves-retina.png";
			} else if(taxonKingdom == "Animalia" && taxonClass == "Reptilia") {
				image = "/images/taxon_icons/reptiles-retina.png";
			} else if(taxonKingdom == "Animalia" && (taxonClass == "Mammalia" || taxonClass == "Mamalia")) {
				image = "/images/taxon_icons/mamiferos-retina.png";
			} else if(taxonKingdom == "Animalia" && taxonClass == "Insecta") {
				image = "/images/taxon_icons/insectos-retina.png";
			} else if(taxonKingdom == "Plantae") {
				image = "/images/taxon_icons/plantas-retina.png";
			} else if(taxonKingdom == "Fungi") {
				image = "/images/taxon_icons/hongos-retina.png";
			} else if(taxonKingdom == "Animalia" && taxonClass == "Amphibia") {
				image = "/images/taxon_icons/anfibios-retina.png";
			} else {
				image = 'data:image/png;base64,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';
			}
			return image;
		}
	}, this);

	this.taxonName = ko.computed(function() {
		return regData.info_taxonomica.taxonnombre.replace(/<[^>]*>?/gm, '');
	}, this);

	self.commonNameWithRegion = function(param1, param2) {
		var text = param1;
		if(param2 != "") {
			text = text + " <em>(usado en: " + param2 + ")</em>";
		}
		return text
	};
}

ko.applyBindings(new CatalogRecordViewModel(), $("#top-zone")[0]);