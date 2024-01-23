# IsigeoOutils
Outils développé pour Isigéo

## bouton_aide.js
Création d'une petite affiche d'aide pour Isigéo, accessible depuis un bouton qui s'affiche à barre d'outils à gauche. Marche sous v6. 

Tu peut configurer ce que tu veux montrer comme aide dans la variable aideElements, sous la forme:

{[id du element | title du element si 'a' ou 'button'] : 
  {'text': 'ton text',
    'type' : [l = element à gauche | r = element à droit | bl = element au fond à gauche]
    }
  }

Mets la code dans un fiche PHP qui tu appelles avec un fonction launchPHP dans ta table mcd, par exemple

## addImageAsLayer.js

addImageAsLayer is a quick way of letting the user add an image as basis for vactorization of existing features (for example rough tracing of networks, adding proposed roads, etc)

The tool lets the user upload a file (image) which gets added as the icon-image of a vectorlayer. The image can be moved, scaled, rotated, and have its transparency changed

Mets la code dans un fiche PHP qui tu appelles avec un fonction launchPHP dans un shortcut, par exemple

## add_wms_cadastre.js

Petit outil pour ajouter le wms ouvert du Cadastre selon la code INSEE rempli

