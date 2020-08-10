# Getting Started
## Considerations
ACE should work in the majority of use cases. However there are a few considerations:
- ACE will have reduced functionality on websites that make heavy use of `iframes` to display content. ACE cannot access the document within the iframe.
- Images are not magically accessible. Make sure all images have an `alt` tag giving an alternate description of the image.
- Text to speech uses the operating system's internal speech synthesiser. Text to speech may not work on operating systems without an installed speech synthesiser (e.g. some distributions of Linux).
