# Birthday Celebration Website

A beautiful, interactive birthday celebration website that combines multiple animated projects into one cohesive experience. Perfect for birthday celebrations, special occasions, or just spreading joy!

## Features

### 🎆 Section 1: Happy Birthday Fireworks
- Animated fireworks display with colorful explosions
- Text appears as fireworks and transforms into balloons
- Fully responsive canvas animation
- Letters fly up as balloons after the fireworks

### 🎂 Section 2: Birthday Cake
- Animated 3D birthday cake with candles
- Realistic fire animations on the candles
- Cake layers build up with smooth animations
- Customizable name display

### ✈️ Section 3: Air Message
- Interactive message system with flying planes
- Type your own messages and watch them fly across the screen
- Colorful plane animations with ropes and banners
- Real-time message creation

### ❤️ Section 4: Heart Animation
- Beautiful 3D heart animation using Three.js
- Pulsing and rotating heart effects
- Music player integration
- Smooth camera movements

### 💡 Section 5: Tuggable Light Bulb
- Interactive light bulb that responds to clicks
- Dynamic lighting effects
- Color-changing background
- Smooth toggle animations

## How to Use

1. **Open the Website**: Open `birthday-website.html` in your web browser
2. **Navigate**: Use the navigation bar at the top to jump between sections
3. **Interact**: 
   - Watch the fireworks animation in the first section
   - See the cake animation in the second section
   - Type messages in the air message section and click "create"
   - Click the music button in the heart section
   - Click the light bulb to toggle it on/off

## File Structure

```
birthday-celebration-website/
├── birthday-website.html      # Main HTML file
├── birthday-website.css       # Styles and animations
├── birthday-website.js        # JavaScript functionality
└── README.md                  # This file
```

## Customization

### Changing the Birthday Message
Edit the `opts.strings` array in the `initFireworks()` function in `birthday-website.js`:

```javascript
const opts = {
    strings: ["HAPPY", "BIRTHDAY!", "to You"], // Change these strings
    // ... other options
};
```

### Changing the Name
Edit the name in the cake section in `birthday-website.html`:

```html
<p class="name">Lovie</p> <!-- Change this name -->
```

### Customizing Colors
Modify the CSS variables in `birthday-website.css` to change the color scheme:

```css
:root {
    --on: 0;
    --bg: hsl(calc(200 - (var(--on) * 160)), calc((20 + (var(--on) * 50)) * 1%), calc((20 + (var(--on) * 60)) * 1%));
    /* ... other variables */
}
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Dependencies

The website uses the following external libraries (loaded via CDN):
- Three.js (for 3D animations)
- GSAP (for advanced animations)
- MorphSVGPlugin (for SVG morphing)
- Draggable (for interactive elements)

## Performance

- All animations are optimized for smooth performance
- Canvas and WebGL rendering for best visual effects
- Responsive design that works on all screen sizes
- Efficient memory usage with proper cleanup

## Troubleshooting

### Animations Not Working
- Make sure JavaScript is enabled in your browser
- Check that all CDN links are loading properly
- Try refreshing the page

### Slow Performance
- Close other browser tabs to free up memory
- Try a different browser
- Check if hardware acceleration is enabled

### Display Issues
- Make sure your browser supports WebGL
- Update to the latest browser version
- Check if any browser extensions are interfering

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to contribute to this project by:
- Adding new animations
- Improving performance
- Fixing bugs
- Adding new features

## Support

If you encounter any issues or have questions, please create an issue in the project repository.

---

**Enjoy your birthday celebration! 🎉**
# urm
