import React from 'react';

export const colorCalulator = {
    rgbToHex: function(r, g, b){
        const toHex = val => {
            const hex = val.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          };
          
          return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },

    hexToRGB: function(hex){
        // Remove the "#"
        hex = hex.substring(1);

        // Parse the r, g, b values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return {r, g, b};
    }

    
};