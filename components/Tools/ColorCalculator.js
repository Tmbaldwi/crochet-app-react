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

    createGradient: function(c1, c2, numSplit){
        let gradient = [c1];

        let rgb1 = this.hexToRgb(c1);
        let rgb2 = this.hexToRgb(c2);

        for(let i = 1; i < numSplit; i++){
            let r3 = Math.round(rgb1.r + i * (rgb2.r - rgb1.r) / numSplit);
            let g3 = Math.round(rgb1.g + i * (rgb2.g - rgb1.g) / numSplit);
            let b3 = Math.round(rgb1.b + i * (rgb2.b - rgb1.b) / numSplit);

            let hex = this.rgbToHex(r3, g3, b3);
            gradient.push(hex);
        }

        gradient.push(c2);
        return gradient;
    }    
};
