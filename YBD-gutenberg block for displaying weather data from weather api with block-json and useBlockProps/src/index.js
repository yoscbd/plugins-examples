
import { useState } from 'react';
import "./index.scss"
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from "@wordpress/block-editor"
import { __ } from '@wordpress/i18n'; // add localozation support


registerBlockType("ourplugin/weather-api-block", {
  /*   title: "weather report block",
    icon: "smiley",
    category: "common",
    attributes: {
      skyColor: { type: "string" },
      grassColor: { type: "string" },
      selectedCountry: { type: "string" },
    }, */
  //------all of the above attributes (such as "title", "icon", "attributes") are located inside block.json file so we dont need them here------.
  edit: function (props) {

    const blockProps = useBlockProps({
      className: "weather-block-api",
      style: { position: "relative" }
    })



    function updateSkyColor(event) {
      props.setAttributes({ skyColor: event.target.value })
    }

    function updateGrassColor(event) {
      props.setAttributes({ grassColor: event.target.value })
    }

    function countrySelect() {
      alert("countrySelect()");
    }

    const country_options = [
      { value: 'none', text: '--Choose an option--' },
      { value: 'tel-aviv,il', text: 'Tel Aviv 🍏' },
      { value: 'london,uk', text: 'London 🍌' },
      { value: 'paris,fr', text: __('Paris 🥝') }, //note we are using __() localization function for the text value in paris.
    ];


    // Initioalize the value for our "selected" variable state.
    // we simply assign an initial value for the "selected" variable so when our app loads and render this will be its value.
    const [selected, setSelected] = useState(country_options[0].value);


    const handleChange = event => {
      // " const handleChange = event =>" is the same as: "const handleChange = function(event){}"

      setSelected(event.target.value); // update our state /variable nammed "selected" with the new selected value
      props.setAttributes({ selectedCountry: event.target.value }) // update the selected value for the selectedCountry

      //see this leture regarding useState:
      // https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/17039436#overview
    };

    return (
      <div  {...blockProps} >
        {/* // we will ,map all select options for countries array  */}
        {/* selected={props.attributes.selectedCountry == option.value} if return true, the option will be selected  */}
        <div>
          <h5 style={{ textAlign: "center" }}> {__("selected country here:")}</h5>
          <select onChange={handleChange}>
            {country_options.map(option => (
              <option key={option.value} value={option.value} selected={props.attributes.selectedCountry == option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <hr />
        <div>
          {/* here you can see convertions to tranaslation string using "n18i", see how  we changed the placeholder attribute:
           <input type="text" placeholder="Sky Color" value={props.attributes.skyColor} onChange={updateSkyColor} />.
           *note that we have also used it for translating the input value returned by our app by wrapping it with"__()":*/}
          <input type="text" placeholder={__("Sky Color")} value={__(props.attributes.skyColor)} onChange={updateSkyColor} />
          <input type="text" placeholder={__("Grass Color")} value={props.attributes.grassColor} onChange={updateGrassColor} />
        </div>

      </div >
    )
  },
  save: function (props) {
    return null
  }
})
