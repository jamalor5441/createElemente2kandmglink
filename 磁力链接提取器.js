// ==UserScript==
// @name         一键磁力ed2k链接
// @namespace    https://github.com/jamalor5441/createElemente2kandmglink/new/main
// @version      1.0
// @description  在页面右下角展示所有磁力链接和eDonkey (ed2k) 链接
// @match        http://*/*
// @match        https://*/*
// @grant        none
// @license      GPL-3.0 License
// ==/UserScript==

(function() {
  'use strict';

  // 提取磁力链接并显示在弹出窗口中
  function extractMagnetLinks() {
    var magnetLinks = [];

    // 遍历所有链接
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
      var linkElement = linkElements[i];
      var link = linkElement.href;
      if (link.startsWith('magnet:') || link.startsWith('ed2k:')) {
        magnetLinks.push(link);
      }
    }

    // 遍历所有文本节点
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      var node = walker.currentNode;
      var text = node.textContent.trim();
      if (text.startsWith('magnet:') || text.startsWith('ed2k:')) {
        magnetLinks.push(text);
      }
    }

    return magnetLinks;
  }

  // 打开所有提取的链接
  function openMagnetLinks(links) {
    links.forEach(function(link) {
      window.open(link, '_blank');
    });
  }

  // 创建提取磁力链接按钮
  var button = document.createElement('button');
  button.innerHTML = '一键磁力ed2k链接';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = 9999;
  button.style.padding = '10px';
  button.style.borderRadius = '50%';
  button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  button.style.backgroundColor = '#007bff';
  button.style.color = '#fff';
  button.style.fontFamily = 'Arial, sans-serif';
  button.style.fontSize = '14px';
  button.style.fontWeight = 'bold';
  button.style.cursor = 'pointer';

  // 提取磁力链接按钮点击事件
  button.addEventListener('click', function() {
    var magnetLinks = extractMagnetLinks();
    openMagnetLinks(magnetLinks);
  });

  // 将按钮添加到页面中
  document.body.appendChild(button);
})();
