export const colorCalculator = {
    rgbToHex: function(r, g, b){
        const toHex = c => ('0' + c.toString(16)).slice(-2);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },

    hexToRgb: function(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
      
        return { r, g, b };
    },

    createGradient: function(colorStart, colorEnd, numSplit){
        let gradient = [colorStart];

        let rgb1 = this.hexToRgb(colorStart);
        let rgb2 = this.hexToRgb(colorEnd);

        for(let i = 1; i < numSplit; i++){
            let r3 = Math.round(rgb1.r + i * (rgb2.r - rgb1.r) / numSplit);
            let g3 = Math.round(rgb1.g + i * (rgb2.g - rgb1.g) / numSplit);
            let b3 = Math.round(rgb1.b + i * (rgb2.b - rgb1.b) / numSplit);

            let hex = this.rgbToHex(r3, g3, b3);
            gradient.push(hex);
        }

        gradient.push(colorEnd);
        return gradient;
    }    
};
