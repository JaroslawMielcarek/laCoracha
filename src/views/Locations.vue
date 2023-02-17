<template>
  <section>
    <h1>Locations</h1>
    <div class="tabs">
      <template v-for="location of locations" :key="location">
        <div @mouseenter="zoomIn" @mouseleave="zoomOut" :id="location.id" class='location__wrapper'>
          <div class="location">
            <h5 class='name'>{{location.name}}</h5>
            <p class='address'>{{location.address}}</p>
          </div>
          <a class="car" :href="location.link"><img src="@/assets/icons/car.svg"/></a>
        </div>
      </template>
    </div>
    <div class="map">
      <svg ref="mapSVG" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
          y="0px" viewBox="0 0 1920 1080" overflow="visible" xml:space="preserve">
        <g id="Layer_4">
        <path fill="#0071BC" stroke="#666666" stroke-width="0.25" stroke-miterlimit="10" d="M1022,1080c-3.1-26.5,25.6-34.7,78-127
        c27.3-48.1,19.4-49.1,76-184c16.4-39.2,33.6-77.8,70-149c7.4-14.5,49.2-71.7,60-69c10.7,2.7,21,10,21,10c-5.6,14.9-10,43-10,43
        c17.6,4.4,52,9,52,9c4-23,7-50,12-73c0,0-19.7-4-31-16c-6.8-7.2-7.2-18.4-8-30c0,0,30.6-45.7,40-54l46-14c6,9-17,49-17,49
        c6,18,12,29,13,45l-14,20l12,30c10.2,2.3,21.3-22.3,24-40l-19-41c1.3-5.2,17.2-22.9,33-38c35.7-34.1,45.1-41,50-40
        c12.2,2.5,8.5,20,15,18c5.7-1.7,0.7-7.3,6-19c5-11,47.4-23.7,66-22c25.7,2.3,27.3,9.5,54,12c19.2,1.8,33.9-5.4,57-8
        c27.3-3,38.4,9.6,57,14c76.2,18.2,130.7,17.9,155,27v647H1022z"/>
        <path fill="none" stroke="#0071BC" stroke-width="12" stroke-linecap="round" stroke-miterlimit="10" d="M1320,561
        c2-87.2,0.4-146,1-184c0.1-9.3-6.5-24.2-5-46c3-43.8,4.7-66.4,6-113c1.7-59.1,6-100,4-122c-3.9-43.2-24.4-75.7-38-96"/>
        <g>
        <path fill="#F15A24" d="M872.7,441.4h-16.3c-2.1,0-3.8-1.7-3.8-3.8v-20.2c0-2.1,1.7-3.8,3.8-3.8h16.3c2.1,0,3.8,1.7,3.8,3.8v20.2
          C876.5,439.7,874.8,441.4,872.7,441.4z"/>
        <rect x="859.9" y="421.9" fill="none" width="10.1" height="11.1"/>
        <text transform="matrix(1 0 0 1 859.9312 430.9321)" fill="#FFFFFF" font-family="'Lato-Black'" font-size="12px">H</text>
        </g>
        <g>
        <path fill="#F15A24" d="M1117.4,378.2l-15.7-4.6c-2-0.6-3.2-2.7-2.6-4.8l5.7-19.3c0.6-2,2.7-3.2,4.8-2.6l15.7,4.6
          c2,0.6,3.2,2.7,2.6,4.8l-5.7,19.3C1121.6,377.6,1119.5,378.7,1117.4,378.2z"/>

          <rect x="1108.4" y="357.6" transform="matrix(0.281 -0.9597 0.9597 0.281 452.9047 1329.7594)" fill="none" width="11.1" height="10.1"/>

          <text transform="matrix(0.9597 0.281 -0.281 0.9597 1108.1501 364.5096)" fill="#FFFFFF" font-family="'Lato-Black'" font-size="12px">H</text>
        </g>
        <g>
        <path fill="#0000FF" d="M1268.9,513.5h-16.9c-2,0-3.6-1.6-3.6-3.6v-16.9c0-2,1.6-3.6,3.6-3.6h16.9c2,0,3.6,1.6,3.6,3.6v16.9
          C1272.5,511.9,1270.9,513.5,1268.9,513.5z"/>
        <path fill="#FFFFFF" d="M1263.8,495.2c1.6,0,2.8,1.1,2.8,2.4v5.7c0,1.1-0.9,2.1-2.2,2.3l1.8,0.7c0.3,0.1,0.4,0.4,0.3,0.6
          c-0.1,0.2-0.4,0.3-0.7,0.2l-0.1,0l-3.8-1.5h-2.7l-3.8,1.5c-0.3,0.1-0.6,0-0.7-0.2c-0.1-0.2,0-0.5,0.3-0.6l1.8-0.7
          c-1.2-0.2-2.2-1.2-2.2-2.3v-5.7c0-1.3,1.3-2.4,2.8-2.4H1263.8z M1265.5,502.1h-9.7l0,1.1c0,0.8,0.8,1.4,1.7,1.4h6.4
          c0.9,0,1.7-0.6,1.7-1.4L1265.5,502.1z M1257.6,502.8c0.4,0,0.8,0.3,0.8,0.6s-0.3,0.6-0.8,0.6s-0.8-0.3-0.8-0.6
          S1257.2,502.8,1257.6,502.8z M1263.6,502.8c0.4,0,0.8,0.3,0.8,0.6s-0.3,0.6-0.8,0.6s-0.8-0.3-0.8-0.6S1263.2,502.8,1263.6,502.8z
            M1263.8,496.1h-6.4c-0.9,0-1.7,0.6-1.7,1.4l0,3.6h9.7l0-3.6C1265.5,496.8,1264.7,496.1,1263.8,496.1z M1261.6,497.1
          c0.3,0,0.6,0.2,0.6,0.5c0,0.3-0.3,0.5-0.6,0.5h-1.9c-0.3,0-0.6-0.2-0.6-0.5c0-0.3,0.3-0.5,0.6-0.5H1261.6z"/>
        </g>
        <g>
        <path fill="#8CC63F" d="M1175.1,707l-6.2,12.4c-1.2,2.5-4.3,3.5-6.8,2.2l-33.9-17c-2.5-1.2-3.5-4.3-2.2-6.8l6.2-12.4
          c1.2-2.5,4.3-3.5,6.8-2.2l33.9,17C1175.3,701.5,1176.3,704.6,1175.1,707z"/>
        <path fill="#FFFFFF" d="M1145.2,700.4c0.3,1.7,1.5,2.9,2.9,3.2c-0.9,0.7-1.6,1.6-2.1,2.8c-0.1,0.3,0,0.7,0.3,0.8
          c1,0.4,2.1,0.4,3.2,0.1c-0.1,0.2-0.2,0.5-0.3,0.8c-0.1,0.3,0,0.6,0.3,0.8c2.2,0.9,4.9-0.3,6-2.6l0.6-1.3l0,0l0.2-0.4
          c1.2-2.4,0.5-5.2-1.5-6.4c-0.3-0.2-0.6-0.1-0.8,0.2c-0.2,0.2-0.3,0.5-0.4,0.7c-0.4-1-1.1-2-2-2.5c-0.3-0.2-0.6-0.1-0.8,0.2
          c-0.7,1.1-1,2.2-1,3.3c-1.2-0.9-2.8-1.2-4.4-0.4C1145.3,699.8,1145.1,700.1,1145.2,700.4z M1150.4,702.6c-1.8,0.7-3.7-0.3-4.3-2.1
          C1148,699.8,1149.9,700.7,1150.4,702.6z M1153.4,704.1c-1.1,0.3-2.1,0.9-2.9,1.7c0,0-0.1,0-0.1,0c-1,0.6-2.3,0.9-3.5,0.6
          c0.5-1.1,1.2-1.9,2.2-2.4c0.8-0.4,1.5-0.4,2-0.4c0.1,0,0.3,0,0.4,0c0.2,0,0.3-0.1,0.4-0.3c0.1-0.2,0.1-0.4,0-0.5
          c-0.1-0.1-0.1-0.2-0.2-0.3c-0.3-0.4-0.8-1-0.9-1.8c-0.2-1.1,0-2.1,0.6-3.2c0.9,0.7,1.5,2,1.6,3.1c0,0,0,0.1,0,0.1
          C1152.9,701.9,1153,703.1,1153.4,704.1z M1154.5,704.2c-0.8-1.5-0.8-3.4,0.1-5c1.4,1.1,1.8,3.2,0.9,5l-0.2,0.4l0,0l-0.6,1.3
          c-0.9,1.8-2.8,2.7-4.5,2.2c0.7-1.7,2.3-2.9,4-3.1c0.2,0,0.3-0.1,0.4-0.3C1154.6,704.5,1154.6,704.3,1154.5,704.2z"/>
        </g>
        </g>
        <g id="Layer_3">
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1144,501
        c-18.6,3.2-46,9.2-78,21c-37.4,13.8-40.3,20.6-66,27c-31,7.8-56,5.2-102,0c-52.8-5.9-49.7-11.8-86-14c-49-3-90.7,6.3-108,9
        c-45,7-60,8-93,16c-28.2,6.8-38.6-4.5-53-22c-10.9-13.3-11.7-28.6-13-53c-0.8-15.4-0.5-38.3,6-66"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M832,534
        c-4-6.2-9.6-16.5-12-30c-4.1-22.9,5.2-32.1,2-54c-1.3-9.4-3.6-11.8-19-42c-15.4-30.2-23.1-45.3-25-51c-14.2-42.2,3.2-56.9-14-84
        c-11.7-18.4-23.6-17.5-27-34c-2.3-11.3,2.4-23.7,12-48c5.7-14.4,11.1-26,15-34"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M921,552
        c1.2-27.7-4.5-47.2-10-60c-1.8-4.2-8.5-19-18-37c-9.9-18.7-14.3-24.6-13-34c1.5-11,9-13.2,14-26c5.1-13.1,3.3-26,1-35"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1234,624
        c-12.2-8-27.9-20.2-43-38c-8.6-10.2-10-14.9-37-66c-18-34-20.1-37.3-24-48c-10.4-28.3-11.7-48.9-12-55c-0.7-14.5,0.6-26.6,2-35"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1327,387
        c-51.5,5.2-100.5,5.7-132,4c-50.6-2.8-74.6-9-85-12c-26.2-7.5-45.9-16.9-65-26c-23.6-11.3-43.6-20.8-67-38
        c-31.1-22.8-30.4-29.3-52-38c-28.8-11.6-36.4-6.7-55-15c-9-4-15.8-30.5-32-56c-7-11-14.1-18.6-30-17c-20,2-20.8-6.2-29-13
        c-12-10-23.3-27.9-29-38c-1.3-2.3-13.6-18.2-17-35c-2-10,39-87,40-103"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1112,467
        c38.8-13.8,76.3-19.7,115-29c29-7,68.5,9.6,91,4c48-12,112-37,112-37c3.8,1.8,6.6,3.8,8,5"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1021,341
        c-40.2,10.3-72.1,12.6-92,17c-20.3,4.4-39.5,2-75,2c-22,0-22-3-44,7c-27.1,12.3-41.4,17.1-61,26c-21,9.5-55.7,13-125,20
        c-29.7,3-50.7,8.1-73,6c-85-8-93,7-121,1c-31-6.7-56.1-13.5-70-27c-67-65-106.8-85.3-133-108c-37-32-70.8-12.9-122-22
        c-28-5-22,21-81-8c-9.1-4.5-18.4,0.6-24,1"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M943,287
        c-7.6,10.6-30.5,28.4-22,49c19,46,48,126,45,158c-2.9,31.1,14,68,39,119"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1076,350
        c40.8-12.7,67.3-30.8,84-45c24-20.4,27.7-32.7,56-53c20.8-14.9,40.2-28.8,68-33c38.8-5.9,51,3,84-1c22.8-2.8,33-23,33-23
        c12-12.9,14.1-22.8,23-24c10.8-1.4,15.3,13.3,28,16c19,4,19-15,55-31"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1329,491
        c-1.4-26.3-3-40-2-55c1.2-17.7,1.9-30.6,0-49c-0.8-8.1-1.3-13.9-3-27c-2-15-1-20-1-27c0-11.8,0.8-22.7,3-46c0.8-8.1,2.5-64.7,3-69"
        />
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M191,452
        c-3.6-7.1-9.5-17.9-8-31c1-9,16-37,24-61c5.8-17.3,17.6-40.5,20-75"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M365,397
        c11.1,11.7,25.6,30,43,54c7.2,9.9-1.4,18.5,7,25c30.6,23.8,63.7,68.2,92,83c11.5,6,35,0,58-13"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1154,520
        c-19.6,14.3-43.6,34.3-75,52c-75.8,42.8-101.4,56.3-120,64c-12,5-52.6,3.5-87,3c-20.1-0.3-38-24-47-24c-21.8,0-48.3-10.5-91-24"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1122,840
        c-7,17-37.4,18-49,14c-26.9-9.3-87-12-111-9c-11,1.4-16.8-7.9-28-17c-19.8-15.9-21.1-37.4-37-48c-50.5-33.8-93.5-54.7-111-64
        c-17-9-59-13-63-19c-4.6-6.9,23-70,19-86c-3.4-13.6-7.8-18.5-10-34c-2.2-15.4-2.6-28.3-2-37"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M998,775
        c19.9-20.1,39.9-40.1,60-60c40.8-40.6,91.8-88.9,133-129"/>
        <path fill="none" stroke="#CCCCCC" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" d="M1301,519
        c-4.9-6.1-10.9-12.4-20-22c-10.9-11.5-16-25-19-27c-6-4-32.8-10.5-35-15c-5-10,1-24-6-32c-9-10.3-18.9-22-26-32"/>
        </g>
        <g id="Layer_2">
        <path fill="none" stroke="#FFFF00" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M0,397
        c80.7,19.9,144.6,39.8,187,54c91.1,30.4,157,55,180,55c73.2,0,124-2.1,149-1c22,1,71.3-12.3,137-24c37.4-6.6,113.6-14.4,205-7
        c86,7,103,19,169,12c37.6-4,64-11,85-19"/>
        <path fill="none" stroke="#FFFF00" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M904,1080
        c19-29.9,22.3-39.5,43-88c12.7-29.8,28.6-67.2,40-118c14.7-65.9,4.7-78.3,19-150c14.1-70.9,24.1-59.7,31-109
        c13.2-94.6,3-115.9,3-184c0-27,45-76,37-98c-14.6-40.1,3-52-3-93c-3.3-22.8,3-41,29-50c19-6.6,25.8-7.3,44-20
        c14.8-10.3,19.6-20.5,23-33"/>
        <path fill="none" stroke="#FFFF00" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M474,1080
        c-19.1-12.4-42.9-32.5-52-63c-8.6-29.1-12-49,11-102c21.7-50,15.4-51,7-114c-8-60-2-88,29-118c31.8-30.7,47.9-30.8,68-70
        c13.8-27,5.3-34.1,21-75c16.5-42.9,27.9-41.2,39-73c7-20-25.1-50.3,2-116c19-46,4-76,13-102c5.8-16.7,40-73,41-102
        c0.7-21,37-58,53-66c21-10.5,29.7-7.7,52-23c25.5-17.6,23.9-30.4,43-41c27.8-15.5,62.1-7.3,77,0c39,19,71.1,47.5,91,68
        c33,34,30.8,50.4,55,62c9.5,4.5,56,2,74,5c80.7,13.4,74-30,90-32c31.3-3.9,49.5-14.1,65-26c28.8-22.2,15-54.6,39-75
        c23.9-20.4,67.6-13.7,95,0c32,16.1,29.4,35.7,82,98c39.9,47.2,63.7,62.4,73,68c22,13.2,52.6,31.5,84,23c23.1-6.3,24.3-21,46-23
        c23.8-2.2,50.8,12.8,63,34c10.8,18.8,7,27,14,43c5.7,13,13.4,25.1,48,21c25-3,22.1,12.5,47,23c18.7,7.9,28.3,11.9,37,11
        c21.2-2.1,35.3-22.5,41-32"/>
        <path fill="none" stroke="#FFFF00" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M794,1080
        c19-40,37-93,68-151c35.7-66.7,101.9-124.5,136-154"/>
        <path fill="none" stroke="#FFFF00" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="M1122,840
        c34.7-95.7,73.8-161.6,104-205c31.4-45.1,44.3-53.1,71-100c31.4-55.1,75-97,75-97c4.2-2.3,0.7-6.8,68-25c3.7,7.8,14,17,20,20
        c7-1,18.5-14.9,43-29c25.9-14.9,33.8-3.4,69-21c9.8-4.9,15.3-8.9,25-9c15.9-0.2,25,10.1,36,16c21.1,11.2,41.3,1.8,73-5
        c54.7-11.7,100.6-6.2,136-2c18.7,2.2,46.5,6.9,80,18"/>
        </g>
        <g id="Pabellons">
        <g id="AveMaria">
        <path fill="#FF0000" d="M1191,677c2.8-3.6,6-13,9-16c6.9-6.9,7.2-13.3,4-19c-5.4-9.7-20.8-10.3-26,0c-3.2,6.4-2.2,12.8,4,19
          C1184,663,1188.4,673.3,1191,677"/>
        <rect x="1180.7" y="643.3" fill="none" width="20.7" height="10.7"/>
        <text transform="matrix(1 0 0 1 1180.6506 652.3242)" fill="#FFFFFF" font-family="'Lato-Black'" font-size="12px">AM</text>
        </g>
        <g id="TorreAtalaya">
        <path fill="#FF0000" d="M836,354c2.8-3.6,6-13,9-16c6.9-6.9,7.2-13.3,4-19c-5.4-9.7-20.8-10.3-26,0c-3.2,6.4-2.2,12.8,4,19
          C829,340,833.4,350.3,836,354"/>
        <rect x="828.3" y="320.3" fill="none" width="15.7" height="10.7"/>
        <text transform="matrix(1 0 0 1 828.3008 329.3242)" fill="#FFFFFF" font-family="'Lato-Black'" font-size="12px">T</text>
        <text transform="matrix(1 0 0 1 834.5283 329.3242)" fill="#FFFFFF" font-family="'Lato-Black'" font-size="12px">A</text>
        </g>
        <g id="Campanillas">
        <path fill="#FF0000" d="M227,337c2.8-3.6,6-13,9-16c6.9-6.9,7.2-13.3,4-19c-5.4-9.7-20.8-10.3-26,0c-3.2,6.4-2.2,12.8,4,19
          C220,323,224.4,333.3,227,337"/>
        <rect x="219.3" y="303.3" fill="none" width="14.7" height="10.7"/>
        <text transform="matrix(1 0 0 1 219.3008 312.3242)" fill="#FFFFFF" font-family="'Lato-Black'" font-size="12px">Ca</text>
        </g>
        <g id="DivinoPastor">
        <path fill="#FF0000" d="M1135,628c2.8-3.6,6-13,9-16c6.9-6.9,7.2-13.3,4-19c-5.4-9.7-20.8-10.3-26,0c-3.2,6.4-2.2,12.8,4,19
          C1128,614,1132.4,624.3,1135,628"/>
        <rect x="1126.3" y="594.3" fill="none" width="16.7" height="10.7"/>
        <text transform="matrix(1 0 0 1 1126.3008 603.3242)" fill="#FFFFFF" font-family="'Lato-Black'" font-size="12px">DP</text>
        </g>
        </g>
      </svg>
    </div>
  </section >
</template>

<script setup>

  import {ref} from 'vue'

  const mapSVG = ref(null)
  const locations = [
    {
    id: 'Campanillas',
    name: 'IES Campanillas',
    address: 'C. Fausto, 45, 29590 Málaga',
    link: 'https://goo.gl/maps/peLVBN1YdeHmEX1Z8'
    },
    {
    id: 'TorreAtalaya',
    name: 'IES Torre Atalaya',
    address: 'C. Fausto, 45, 29590 Málaga',
    link: 'https://goo.gl/maps/hKpYgZAhq9g9qsaDA'
    },
    {
    id: 'DivinoPastor',
    name: `Colegion Privado El Divino Pastor`,
    address: 'C. Gaucín, S/N, 29003 Málaga',
    link: 'https://goo.gl/maps/2cChBe7AFmzhfAP1A'
    },
    {
    id: 'AveMaria',
    name: `Colegion Ave Maria`,
    address: 'C. Gaucín, S/N, 29003 Málaga',
    link: 'https://goo.gl/maps/2tGBtKjgNC6HEbK39'
    }
  ]
  function zoomIn(el) {
    const zoom = 2
    if(!mapSVG.value) return null

    const {width, height} = mapSVG.value.getBBox()
    const map = {
      centerX: width / (zoom * 2) ,
      centerY: height / (zoom * 2)
    }
    const {x, y} = getElementCoordinations(mapSVG.value, el)

    mapSVG.value.setAttribute("viewBox", `${x-map.centerX} ${y-map.centerY} ${width/zoom} ${height/zoom}`)
  }
  function zoomOut(el) {
    if(!mapSVG.value) return null
		
    const {width, height} = mapSVG.value.getBBox()

    mapSVG.value.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }

  function getElementCoordinations (viewBox, el) {
    const layers = viewBox.children
    
    if(!layers) return null
    const pab = layers.namedItem('Pabellons')

    if(!pab) return null
    const children = pab.children

    if(!children) return null
    const pabLoc = children.namedItem(`${el.target.id}`)

    if(!pabLoc) return null

    return pabLoc.getBBox()
  }

</script>
<style lang="scss" scoped>
@import '@/colors.scss';

.location__wrapper {
  border: 1px solid $blueDark;
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  .location {
    padding: 0 1em;
    max-width: 70%;
  }
  .name {
    font-weight: 900;
    max-width: 15ch;
  }
  .car {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    background-color: rgba($blueDark, .8);
    padding: 4px;
    &:hover {
      background-color: rgba($blueDark, 1);
      img {
        transform: scale(0.9);
      }
    }
    img {
      width: 24px;
      height: auto;
      filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(200deg) brightness(109%) contrast(101%);
    }
  }
}
.tabs {
  display: grid;
  grid-template-columns: auto;
  grid-column-gap: 2rem;
}
.map {
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  background-color: $white;
  svg {
    display: flex;
    overflow: hidden;
    border-radius: 4px;
  }
  }


@media (min-width: 600px) {
  .tabs {
    grid-template-columns: repeat(2, auto);
    margin-bottom: 2rem;
  }
}
</style>