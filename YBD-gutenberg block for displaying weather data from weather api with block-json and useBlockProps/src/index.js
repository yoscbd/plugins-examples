
import { useState } from 'react';
import "./index.scss"
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from "@wordpress/block-editor"

import { __ } from '@wordpress/i18n';


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
      { value: 'paris,fr', text: 'Paris 🥝' },
    ];


    // listen to "selected" and fire "setSelected" function when detecting changes in "selected" prop :
    const [selected, setSelected] = useState(country_options[0].value);

    const handleChange = event => {

      setSelected(event.target.value); // fire our on change useState event and passing selected value
      props.setAttributes({ selectedCountry: event.target.value }) // update the selected value for the selectedCountry
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
          <input type="text" placeholder="sky color" value={props.attributes.skyColor} onChange={updateSkyColor} />
          <input type="text" placeholder="grass color" value={props.attributes.grassColor} onChange={updateGrassColor} />
        </div>

      </div >
    )
  },
  save: function (props) {
    return null
  }
})
