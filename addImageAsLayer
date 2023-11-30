(() => {
  "use strict";
  if (document.getElementById("removeApglAddImagex")) {
    return;
  }

  const formHtml = `

  <div
    class="card-header rounded-0 bg-primary text-white text-left py-2">
Ajout image
    <a class="d-flex btn btn-outline-light float-right rounded-circle p-1" ">
      <span id="removeApglAddImagex" class="icon icon-remove"></span>
    </a>  </div>      <div class="apglflexcontainerimage">                        
                            <input type="file" style="flex-basis:900px" accept="image/*" id="fileForApglAddImageIcon" />
                              <label for="rangeForApglAddImageOpacity" style="padding:0px 5px 0px 5px">Opacité  </label>
                            <input id="rangeForApglAddImageOpacity" type="range" min="0" max="1" value="1" step="0.01" />
                            <label for="rangeForApglAddImageRotation" style="padding:0px 5px 0px 5px">Rotation  </label>
                            <input id="rangeForApglAddImageRotation" type="range" min="-3.14" max="3.14" value="0" step="0.01" />
</div><div class="apglflexcontainerimage">

                                 <label for="rangeForApglAddImageScale" style="padding:0px 5px 0px 5px">Echelle  </label> 
                            <input id="rangeForApglAddImageScale" type="range" min="0.01" max="10" value="1" step="0.01" />
                          </div></div>`;

  let formEl = document.createElement("div");
  formEl.style.fontFamily = '"News Cycle","Arial Narrow Bold",sans-serif';
  formEl.classList.add("window");
  formEl.classList.add("active");
  formEl.innerHTML = formHtml;
  formEl.style.position = "relative";

  document.getElementById("fond_isigeo").appendChild(formEl);
  const [flexEl1, flexEl2] = document.getElementsByClassName(
    "apglflexcontainerimage"
  );
  flexEl1.style.display = "flex";
  flexEl1.style.justifyContent = "space-between";
  flexEl2.style.display = "flex";
  flexEl2.style.justifyContent = "space-between";
  flexEl1.style.alignItems = "center";
  flexEl2.style.alignItems = "center";
  const closeX = document.getElementById("removeApglAddImagex");
  const inputElement = document.getElementById("fileForApglAddImageIcon");
  inputElement.addEventListener("change", loadFile);

  inputElement.classList.add("btn");

  const scaleRangeElement = document.getElementById(
    "rangeForApglAddImageScale"
  );
  scaleRangeElement.addEventListener("change", handleScaleRange, false);
  const scaleOpacityElement = document.getElementById(
    "rangeForApglAddImageOpacity"
  );
  scaleOpacityElement.addEventListener("change", handleOpacityRange, false);

  const scaleRotationElement = document.getElementById(
    "rangeForApglAddImageRotation"
  );

  scaleRotationElement.addEventListener("change", handleRotationRange, false);

  var vectorSource,
    vectorLayer,
    modify,
    iconStyle,
    iconFeature,
    imageScale,
    rotation,
    startZoom,
    scaleFactor;

  function onResolutionChange() {
    imageScale =
      (Viewer.map.getView().getResolutionForZoom(startZoom) /
        Viewer.map.getView().getResolution()) *
      scaleFactor;

    scaleRangeElement.value = imageScale;
    iconFeature.setStyle(function (feature) {
      iconStyle[0].getImage().setScale(parseFloat(imageScale));
      return iconStyle;
    });
  }
  function handleScaleRange(e) {
    if (iconFeature) {
      imageScale = e.target.value;
      scaleFactor =
        (Viewer.map.getView().getResolution() /
          Viewer.map.getView().getResolutionForZoom(startZoom)) *
        imageScale;
      iconFeature.setStyle(function (feature) {
        iconStyle[0].getImage().setScale(parseFloat(imageScale));
        return iconStyle;
      });
    }
  }
  function handleRotationRange(e) {
    if (iconFeature) {
      rotation = e.target.value;
      console.log("rotation", rotation);
      iconFeature.setStyle(function (feature) {
        iconStyle[0].getImage().setRotation(parseFloat(rotation));
        return iconStyle;
      });
    }
  }
  function handleOpacityRange(e) {
    vectorLayer ? vectorLayer.setOpacity(parseFloat(e.target.value)) : null;
  }
  function loadFile(e) {
    e.preventDefault();

    if (inputElement.files[0]) {
      startZoom = Viewer.map.getView().getZoom();

      const reader = new FileReader();
      reader.onload = (e) => {
        iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(Viewer.map.getView().getCenter()),
        });

        const fill = new ol.style.Fill({
          color: "rgba(255,0,0,0.7)",
        });
        const stroke = new ol.style.Stroke({
          color: "rgba(255,255,255,1)",
          width: 2,
        });
        const modFill = new ol.style.Fill({
          color: "rgba(0,255,0,1)",
        });
        const modStroke = new ol.style.Stroke({
          color: "rgba(255,255,255,1)",
          width: 2,
        });
        const modifyStyle = new ol.style.Style({
          image: new ol.style.Circle({
            fill: modFill,
            stroke: modStroke,
            radius: 10,
          }),
          fill: fill,
          stroke: stroke,
        });
        iconStyle = [
          new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 0.5],
              anchorXUnits: "fraction",
              anchorYUnits: "fraction",
              src: e.target.result,
              scale: 1,
            }),
          }),
          new ol.style.Style({
            image: new ol.style.Circle({
              fill: fill,
              stroke: stroke,
              radius: 10,
            }),
            fill: fill,
            stroke: stroke,
          }),
        ];

        vectorSource = new ol.source.Vector({
          features: [iconFeature],
        });

        vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          zIndex: 1000,
          style: function (feature, resolution) {
            return iconStyle;
          },
        });
        vectorLayer.set("name", "ApglAddedImage");
        modify = new ol.interaction.Modify({
          hitDetection: vectorLayer,
          source: vectorSource,
          style: modifyStyle,
        });

        Viewer.map.addInteraction(modify);
        const len = Viewer.map.getLayers().length;
        Viewer.map.getLayers().insertAt(len, vectorLayer);
      };
      Viewer.map.getView().on("change:resolution", onResolutionChange);
      reader.readAsDataURL(inputElement.files[0]);
    }
  }

  function resetLayerAndInteractions() {
    Viewer.map.removeLayer(vectorLayer);
    Viewer.map.removeInteraction(modify);
    vectorLayer = null;
    modify = null;
    imageScale = 1;
    scaleRangeElement.value = imageScale;
    scaleOpacityElement.value = 1;
    scaleRotationElement.value = 0;
    scaleFactor = 1;
  }
  function closeAll() {
    resetLayerAndInteractions();
    document.getElementById("fond_isigeo").removeChild(formEl);
    Viewer.map.getView().un("change:resolution", onResolutionChange);
    formEl = null;
  }
  inputElement.addEventListener("click", resetLayerAndInteractions);
  closeX.addEventListener("click", closeAll);
})();
