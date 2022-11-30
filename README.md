# Dept Tech Test

App is built with react, hosted on Netlify. It should meet all criteria specified in the deliverables.

Link to test: (Link)[https://dainty-praline-79dcec.netlify.app]

##Some notes
* I initially started using just a CSS stylesheet, then decided the following evening to finish off the remaining UI with styled components. I figured it was worth showing I could pick it up quickly.
* Styling is as close as possible but may not be pixel perfect.
* The autocomplete dropdown is probable the least close to the design (on the basis it doesn't use a custom scrollbar). I'd probably look into a third party component to use here in a real project but I didn't want to go to overboard on third party code.
* There is no Typescript. Had I had a bit more time I would have liked to at least done some type inference on props being fed to the card component.
* The location cards depend on gap being supported for flex layouts, which will not work some older but certainly far from legacy Apple devices.
* As I've mentioned in the previous interview, while I have worked with React it is not regular, so if there is any feedback on what I could do better here, I'm all ears!