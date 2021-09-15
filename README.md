# Agog Content Slider

## Demo

[https://agogcontentslider.netlify.app/](https://agogcontentslider.netlify.app/)

## Options

| Option | Default Value | Description  |
|--|--|--|
| **selector** | [data-agog-content-slider] | main selector to run the plugin |
| **containerClass** | agogContentSlider-container | container element css class |
| **itemContainerClass** | agogContentSlider-items-container | items parent container element css class |
| **carouselClass** | agogContentSlider-items |  items container css class |
| **itemClass** | agogContentSlider-item | item css class |
| **size** | 3 | number of elements to appear at once |
| **callbackBefore** | function() {} | function to run before plugin runs |
| **callbackAfter** | function() {} | function to run after plugin runs |

## Example

    <div class="container">
        <div class="custom-container" data-agog-content-slider>
        <div>
            <div class="box">
                <img src="1.svg" alt="Icon" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mollis leo, sed ornare nunc.
                    Pellentesque ut ex in tellus pretium porttitor.</span>
            </div>
        </div>
        <div>
            <div class="box">
                <img src="2.svg" alt="Icon" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mollis leo, sed ornare nunc.
                    Pellentesque ut ex in tellus pretium porttitor.</span>
            </div>
        </div>
        <div>
            <div class="box">
                <img src="3.svg" alt="Icon" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mollis leo, sed ornare nunc.
                    Pellentesque ut ex in tellus pretium porttitor.</span>
            </div>
        </div>
        <div>
            <div class="box">
                <img src="4.svg" alt="Icon" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mollis leo, sed ornare nunc.
                    Pellentesque ut ex in tellus pretium porttitor.</span>
            </div>
        </div>
        <div>
            <div class="box">
                <img src="1.svg" alt="Icon" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mollis leo, sed ornare nunc.
                    Pellentesque ut ex in tellus pretium porttitor.</span>
            </div>
        </div>
        <div>
            <div class="box">
                <img src="2.svg" alt="Icon" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mollis leo, sed ornare nunc.
                    Pellentesque ut ex in tellus pretium porttitor.</span>
            </div>
        </div>
        <div>
            <div class="box">
                <img src="3.svg" alt="Icon" />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mollis leo, sed ornare nunc.
                    Pellentesque ut ex in tellus pretium porttitor.</span>
            </div>
        </div>
    </div>
    </div>

    <script>
        agogContentSlider.init();
    </script>

