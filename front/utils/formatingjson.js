/**
 * Функция для извлечения чистого текста из JSON структуры Tiptap
 * @param {Object} json - JSON контент Tiptap
 * @returns {string} - Извлеченный текст
 */
export function extractTextFromTiptapJSON(json) {
    // Если входные данные - строка, пытаемся её распарсить
    const content = typeof json === 'string' ? JSON.parse(json) : json;
    
    // Проверка на null или undefined
    if (!content) return '';
    
    // Функция для рекурсивного извлечения текста из узлов
    function extractTextFromNode(node) {
      // Если это текстовый узел, возвращаем его содержимое
      if (node.type === 'text') {
        return node.text || '';
      }
      
      // Если это paragraph, heading и т.д. - обрабатываем его содержимое
      if (node.content && Array.isArray(node.content)) {
        // Рекурсивно обрабатываем дочерние узлы и соединяем их содержимое
        const texts = node.content.map(child => extractTextFromNode(child));
        
        // Добавляем перенос строки после параграфов, заголовков и списков
        const needsLineBreak = ['paragraph', 'heading', 'bulletList', 'orderedList'].includes(node.type);
        return texts.join('') + (needsLineBreak ? '\n' : '');
      }
      
      // Для узлов без содержимого возвращаем пустую строку
      return '';
    }
    
    // Обрабатываем корневой узел (типа 'doc')
    if (content.type === 'doc' && content.content) {
      return content.content.map(node => extractTextFromNode(node)).join('').trim();
    }
    
    // Обработка корневого массива (если JSON начинается с массива)
    if (Array.isArray(content)) {
      return content.map(node => extractTextFromNode(node)).join('').trim();
    }
    
    // Если структура не соответствует ожиданиям
    return '';
  }
  
  /**
   * Пример использования для предпросмотра
   * Создает короткий превью-текст с ограничением по длине
   * @param {Object|string} tiptapJSON - JSON контент Tiptap
   * @param {number} maxLength - Максимальная длина превью (по умолчанию 150 символов)
   * @returns {string} - Текст предпросмотра
   */
  export function createPreviewText(tiptapJSON, maxLength = 150) {
    try {
      const fullText = extractTextFromTiptapJSON(tiptapJSON);
      
      if (fullText.length <= maxLength) {
        return fullText;
      }
      
      // Обрезаем текст до указанной длины и добавляем многоточие
      return fullText.substring(0, maxLength).trim() + '...';
    } catch (error) {
      console.error('Ошибка при создании предпросмотра:', error);
      return '';
    }
  }