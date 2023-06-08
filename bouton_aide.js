(function () {
  const urlTuto = 'URL à ton tuto, si tu en as. Sinon, vaut mieux supprimer la code qui crée le div pour afficher tuto';
  const urlImgFleche = 'URL à ton SVG d\'une jolie flêche';
	const aideElements = {
		'layercontrol': {'text':'Modifier l\'affichage des couches','type':'l'}, 
		'localise' : {'text':'Localisation et requêteur','type':'l'}, 
		'existepas': {'text':'existepas','type':'l'}, 
		'cartes': {'text':'Changer de carte','type':'l'}, 
		'Matrice Cadastrale': {'text':'Accès Matrice cadastrale','type':'l'}, 
		'tutoriel_geo_': {'text':'Tutoriels interactifs','type':'bl'}, 
		'switch-layer': {'text':'Changer de fond ( + de fonds disponible dans le contrôle de couches)','type':'bl'}, 
		'informations_geo_': {'text':'Formulaire de contact','type':'l'}, 
		'Outils de selection': {'text':'Sélection d\'objets sur la carte','type':'r'},
		'Outils de mesure': {'text':'Mesure de distance et surface','type':'r'},
		'Outils de dessin': {'text':'Outils de dessin','type':'r'},
		'Afficher la légende': {'text':'Afficher la légende','type':'r'}
	};
	const aideIcon = document.createElement('i');
	const aideButton = document.createElement('Button');
    const modal = document.createElement('div');

	const toolbar = document.getElementById('toolsbar');

	aideButton.appendChild(aideIcon);
	aideButton.setAttribute('title', 'Afficher l\'aide');
	aideButton.setAttribute('type', 'aideButton');
	aideIcon.setAttribute('class', 'icon icon-question-fill ico-h1')
	aideButton.setAttribute('class', 'rounded-0 sb-toggle-left btn btn-light border box-h1')
    aideButton.onclick = showModal;
	toolbar.appendChild(aideButton);
	function setStyle(el, styles) {
		for (let style in styles) {
			el.style[style] = styles[style];
		};
	};
	
	function drawImgAndText(el, imgTop, left, imgheight, imgwidth, rotate) {
		let imgTransStyle = {};
		let textTransStyle = {};
		const imgStyle = {'position': 'absolute', 'height': imgheight + 'px', 'width': imgwidth + 'px',  'backgroundImage': 'url('+urlImgFleche+')', 'backgroundSize': 'contain', 'backgroundPositionY': 'top', 'backgroundPositionX':  0,'backgroundRepeat': 'no-repeat', 'backgroundOrigin': 'border-box', 'top' : imgTop +'px', 'left' : left +'px', 'position' : 'absolute', 'zIndex' : '10000',};
		const textStyle =  {
			'position': 'absolute',
			'backgroundColor': '#3a423d',
			'border': '2px solid #fff',
			'color': 'hsla(360,100%,100%,1)',
			'fontSize': '1em',
			'top' : imgTop + imgheight/2 +'px',
			'left' : left + imgwidth +'px',
			'width': 'auto',
			'zIndex': '12000',
			'padding': '0.2em',
			'fontFamily': 'News Cycle',
					};
		const imgFleche = document.createElement('div');
		const textDiv = document.createElement('div');
		
		textDiv.innerText = aideElements[el]['text']
	
		if (rotate) {
					imgTransStyle = {...imgStyle, ...{
	
						'transform' : 'rotate(' + rotate[0] + 'deg)' + rotate[1],
						'transform-origin': 'top left',
					}};	
					textTransStyle = {...textStyle, ...{
						'left' : rotate[2],
						'right' : rotate[3],
						'top' : rotate[4],
						'bottom' : rotate[5]
					}}	;
		};

		imgTransStyle = { ...imgStyle, ...imgTransStyle,};
		textTransStyle = { ...textStyle, ...textTransStyle}
		setStyle(textDiv, textTransStyle);
		setStyle(imgFleche, imgTransStyle);
		modal.appendChild(imgFleche);
		modal.appendChild(textDiv);
	
	}
	
	function getBoundingBox(element) {
	  const box = element.getBoundingClientRect();
	  const ret = {};
	
	  for (const prop in box) {
		ret[prop] = box[prop]
	  };
	
	  ret.xCenter = (box.left + box.right) / 2;
	  ret.yCenter = (box.top + box.bottom) / 2;
	  return ret;
	}

	function showTuto() {
		isigeoGUI.openIframeDialog(urlTuto, 'tutocompletaide', 'Tuto Géo64 complet', {
			position: 'center',
		   affichage: 'medium'
		  });
    //parce qu'il faut faire des bêtises pour mieux montrer notre tuto. A améliorer (jamais)
		  document.getElementById('tutocompletaide').style.width = '51em';
	}

	function removeModal() {
        while (modal.firstChild) {
            modal.removeChild(modal.firstChild)
        }
        modal.remove();
	};
	
	function showInfo(event) {
		document.getElementById('apgl64aidecontainer').innerText = aideElements[event.target.getAttribute('elName')]['text'];
	};
	
function showModal() {

	const modalStyle = {
		'position':'absolute',
		'top':'0',
		'left':'0',
		'height':'100%',
		'width':'100%',
		'visibility': 'visible',
		'backgroundColor': '#141212CC',
		'zIndex': '9000',
	};
	const desktopSize = window.screen.availWidth > 800;
    modal.id = 'MODAL';

	setStyle(modal, modalStyle);
    document.body.prepend(modal);
    if (desktopSize) {
        modal.addEventListener("click", removeModal);
        let afficheAideComplet = document.createElement('button');	
        const afficheAideCompletStyle = {
            'position': 'absolute',
            'backgroundColor': '#3a423d',
            'border': '2px solid #fff',
            'color': 'hsla(360,100%,100%,1)',
            'fontSize': '1em',
            'top' : '5%',
            'left' : '50%',
            'width': '30%',
            'margin': '0 auto',
            'transform': 'translate(-50%,-50%)',
            'zIndex': '12000',
            'padding': '0.2em',
            'fontFamily': 'News Cycle',
        };
        afficheAideComplet.innerText = 'Cliquez ici pour afficher le tutoriel interactif complet!';
        afficheAideComplet.addEventListener("click", showTuto);
        setStyle(afficheAideComplet, afficheAideCompletStyle);
        modal.appendChild(afficheAideComplet);
        //afficheAideComplet.setAttribute('class', 'rounded-0 sb-toggle-left btn btn-light border box-h1')
        afficheAideComplet.classList.add('apgl64modalstatics');
    
    } else {
        const helpText = document.createElement('div');

        const helpTextStyle = {
            'backgroundColor': 'hsla(221,9%,11%,.5)',
            'border': '2px solid #fff',
            'color': 'hsla(360,100%,100%,.9)',
            'fontSize': '1.5em',
            'left': '50%',
            'position': 'absolute',
            'display': 'flex',
            'text-align': 'center',
            'justify-content': 'center', 
            'align-items': 'center', 
            'height' : '32%',
            'width': '45%',
            'top': '50%',
            'transform': 'translate(-50%,-50%)',
            'padding': '0.5em',
            'fontFamily': 'News Cycle',
        };
        helpText.setAttribute('id', 'apgl64aidecontainer');
        helpText.classList.add('apgl64modalstatics');
        helpText.innerText = 'Cliquez sur une cadre pour afficher l\'aide ici';
        modal.appendChild(helpText);
        const closeButton = document.createElement('div');
        const closeButtonStyle = {
            'backgroundColor': 'hsla(221,9%,11%,.5)',
            'border': '2px solid #fff',
            'color': 'hsla(360,100%,100%,.9)',
            'fontSize': '2em',
            'left': '75%',
            'position': 'absolute',
            'top': '34%',
            'zIndex': '12000',
            'padding': '0.2em'
        };
    
        setStyle(helpText, helpTextStyle);

        closeButton.addEventListener("click", removeModal);
        closeButton.innerText = 'X';
        closeButton.classList.add('apgl64modalstatics');

        setStyle(closeButton, closeButtonStyle);
        modal.appendChild(closeButton);
    
    };

	
    Object.keys(aideElements).forEach((el) => {
        let domEl = document.getElementById(el);
        if (!domEl) {
            domEl = document.querySelector('a[title=\''+el+'\']') || document.querySelector('button[title=\''+el+'\']')
        };

        if (domEl) {
            const box = getBoundingBox(domEl)
            const { left, xCenter, height, width, top } = box
            let imgwidth, imgheight, rotate;
            let helpOutline = document.createElement('div');
            let helpOutlineStyle = {
                'position': 'absolute', 
                'height': height + 4 + 'px', 
                'border': '3px dashed #fff',
                'width': width + 4 + 'px',
                'top' : top-2+'px',
                'left' : left - 2 +'px',
                'position' : 'absolute',
                'zIndex' : '10000',
            };
            setStyle(helpOutline, helpOutlineStyle);
            if (!desktopSize) {
                helpOutline.addEventListener("click", showInfo);
                helpOutline.setAttribute('elName', el);
            }
            if (desktopSize) {
                switch (aideElements[el].type) {
                    case 'l':
                        left = xCenter;
                        imgwidth = 100;
                        imgheight = 70;
                        rotate = false;
                        imgTop = top + height /2;
                        break;
                    case 'r':
                        imgwidth = 100;
                        imgheight = 70;
                        left = xCenter;
                        imgTop = top + height /2;
                        rotate = ['180', 'scaleY(-1)', '', imgwidth*1.5 + 'px', imgTop + imgheight/2 +'px', ''];
                        break;
                    case 'bl':
                        imgwidth = 100;
                        imgheight = 70;
                        left = xCenter;
                        imgTop = top + height /2;
                        rotate = ['270', '', xCenter + 'px', '', imgTop -imgwidth+'px', ''];
                        break;
                    default:
                        break;
                };	
                        drawImgAndText(el, imgTop, left, imgheight, imgwidth, rotate);

            }
            modal.appendChild(helpOutline)
        };
    });
	};
})();






