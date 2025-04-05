
export const execCommand = (command: string, value: string = '') => {
  document.execCommand(command, false, value);
};

export const insertHeading = (level: 1 | 2 | 3) => {
  execCommand('formatBlock', `<h${level}>`);
};

export const createTable = () => {
  const table = document.createElement('table');
  table.className = 'border-collapse border border-gray-300 dark:border-gray-600';
  table.style.direction = 'ltr';
  
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (let i = 0; i < 3; i++) {
    const th = document.createElement('th');
    th.className = 'border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700';
    th.contentEditable = 'true';
    th.style.direction = 'ltr';
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  const tbody = document.createElement('tbody');
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
      const td = document.createElement('td');
      td.className = 'border border-gray-300 dark:border-gray-600 p-2';
      td.contentEditable = 'true';
      td.style.direction = 'ltr';
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  
  return table;
};

export const changeFontSize = (size: string) => {
  document.execCommand('fontSize', false, '7');
  const fontElements = document.getElementsByTagName('font');
  for (let i = 0; i < fontElements.length; i++) {
    if (fontElements[i].size === '7') {
      fontElements[i].removeAttribute('size');
      fontElements[i].style.fontSize = size;
    }
  }
};

export const changeFontFamily = (family: string) => {
  document.execCommand('fontName', false, family);
};
