export const updateMatrix = (matrix, predictions, vidHeight, vidWidth) => {
    predictions.forEach(prediction => {
        if (prediction['class'] === 'car' && (prediction['bbox'][0] < 1000 && prediction['bbox'][0] > 100) && prediction['score'] > 0.5) {
            const [x, y, width, height] = prediction['bbox'];
            const window = Math.ceil(width / matrix.length);
            const mainIdx = Math.ceil(((x + width / 2) / vidWidth) * (matrix.length))
            let lo = 0;
            let hi = matrix.length;
            let i = 0;
            while (i < matrix.length) {
                if (i === mainIdx) {
                    lo = mainIdx - window >= 0 ? mainIdx - window : 0;
                    hi = mainIdx + window < matrix.length - 1 ? mainIdx + window : matrix.length - 1;
                    while (lo <= hi) {
                        matrix[lo] = 0;
                        matrix[hi] = 0;
                        lo++;
                        hi--;
                    }
                }
                else {
                    matrix[i] = 1;
                }
                i++;
            }
        }
        else {
            for (let i = 0; i < matrix.length; i++) {
                matrix[i] = 1;
            }
        }
    })
  return matrix;
}