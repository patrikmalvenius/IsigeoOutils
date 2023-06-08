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
