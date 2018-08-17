;(function(win) {
  if (typeof win !== 'object' || typeof win.document !== 'object') {
    return;
  }

  var doc = win.document;
  var script = doc.createElement('script');
  win.define = null;

  script.src = 'https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.2.7-beta.4/dist/g2.min.js';

  script.onload = function() {
    var script2 = doc.createElement('script');
    var prevDefine = win.define;
    script2.src = 'https://unpkg.com/timing2@0.2.0/lib/timing2.js';
    script2.onload = function() {
      win.define = prevDefine;
      var div = doc.createElement('div');
      div.style.position = 'fixed';
      div.style.width = '100%';
      div.style.height = 300;
      div.style.zIndex = 9999;
      div.style.top = 0;
      div.style.backgroundColor = '#fff';
      div.style.borderBottom = '1px solid #999';
      document.body.appendChild(div);

      var rawData = timing2({ type: 'page' });

      var start = rawData.find(d => d.name === 'redirect').start;
      var chart = new G2.Chart({
        container: div,
        forceFit: true,
        height: 400,
        padding: [50, 100, 50, 150]
      });

      var ttfb = rawData.find(d => d.name === 'timeToFirstByte').time
      chart.guide().line({
        start: ['redirect', start+ttfb],
        end: ['loadEvent', start+ttfb],
        lineStyle: {
          stroke: '#999',
          lineDash: [ 0, 2, 2 ],
          lineWidth: 1
        },
        text: {
          content: `Time to First Byte (TTFB) - ${Math.round(ttfb)}ms`,
          textAlign: 'left',
          autoRotate: false,
          offsetX: 105,
          offsetY: -240
        }
      });



      var domready = rawData.find(d => d.name === 'domContentLoaded').time
      chart.guide().line({
        start: ['redirect', start+domready],
        end: ['loadEvent', start+domready],
        lineStyle: {
          stroke: '#999',
          lineDash: [ 0, 2, 2 ],
          lineWidth: 1
        },
        text: {
          content: `DOMContentLoaded - ${Math.round(domready)}ms`,
          textAlign: 'left',

          autoRotate: false,
          offsetX: 95,
          offsetY: -175
        }
      });


      var load = rawData.find(d => d.name === 'load').time;
      chart.guide().line({
        start: ['redirect', start+load],
        end: ['loadEvent', start+load],
        lineStyle: {
          stroke: '#f40',
          lineDash: [ 0, 2, 2 ],
          lineWidth: 1
        },
        text: {
          content: `load - ${Math.round(load)}ms`,
          textAlign: 'left',
          style: {
            fill: '#f40',
          },
          autoRotate: false,
          offsetX: 48,
          offsetY: -150
        }
      });


      var fp = rawData.find(d => d.name === 'firstPaint').time
      chart.guide().line({
        start: ['redirect', start+fp],
        end: ['loadEvent', start+fp],
        lineStyle: {
          stroke: '#999',
          lineDash: [ 0, 2, 2 ],
          lineWidth: 1
        },
        text: {
          content: `First Paint - ${Math.round(fp)}ms`,
          textAlign: 'left',

          autoRotate: false,
          offsetX: 65,
          offsetY: -225
        }
      });


      var fcp = rawData.find(d => d.name === 'firstContentfulPaint').time
      chart.guide().line({
        start: ['redirect', start+fcp],
        end: ['loadEvent', start+fcp],
        lineStyle: {
          stroke: '#999',
          lineDash: [ 0, 2, 2 ],
          lineWidth: 1
        },
        text: {
          content: `First Contentful Paint - ${Math.round(fcp)}ms`,
          textAlign: 'left',
          autoRotate: false,
          offsetX: 98,
          offsetY: -200
        }
      });

      chart.axis('range', {
        grid: null
      }).coord().transpose().scale(1, -1);

      var finalData = rawData.filter(d => d.durationType).map(d => ({...d, range: [d.start, d.end]}))
      chart.source(finalData, {
        range: {type: 'time', formatter(val) { return Math.round(val - start) + 'ms' }}
      });
      chart.interval().position('name*range')
        .color('durationType', ['#2FC25B', '#F04864', 'blue'])
        .tooltip('time');

      chart.render();
    }

    doc.body.appendChild(script2);
  }

  doc.body.appendChild(script);
}(this));
