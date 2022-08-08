import "./index.scss"
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker } from "@wordpress/components"
import { InspectorControls, BlockControls, AlignmentToolbar } from "@wordpress/block-editor"
import { ChromePicker } from "react-color"

//self invoking function to store the staqe of look - if it is true we wont allow user to save the post,
// this way we can keep track all of our custom block instences (having several of the in the same post) 
// and make sure each question block has a currect answer mark, if one of the questions is missing the currect answer 
// we use "lockPostSaving" to prevent the user from updating the post until he chose the currect answer to all question blocks 
(function () {
  let locked = false

  //"wp.data.subscribe function: " Listen to the general scop of all blocks, This way we can get the event if a user make any change in any section on the screen 
  wp.data.subscribe(function () {

    //"line:18 : We now get all block in the current post\page and filter them so we can build a new array all of our questions blocks
    // where use didnt mark the correct answer:
    const results = wp.data.select("core/block-editor").getBlocks().filter(function (block) {
      return block.name == "ybdplugin/are-you-paying-attention" && block.attributes.correctAnswer == undefined
    })

    if (results.length && locked == false) {
      // in case we found a question block that witouth the correct answer:
      locked = true //update the state so we can disable the "update" button of the post until user add correct answer to all questions blocks


      wp.data.dispatch("core/editor").lockPostSaving("noanswer") //disable "update" button for the post\page
    }

    if (!results.length && locked) {
      // in case we didnt find any question blocks with missing
      // answer we update the state and unlock the page\post "update" button so the user can save the changes
      locked = false
      wp.data.dispatch("core/editor").unlockPostSaving("noanswer")
    }
  })
})()


//register our custom block
wp.blocks.registerBlockType("ybdplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: [""] },
    correctAnswer: { type: "number", default: undefined },
    bgColor: { type: "string", default: "#EBEBEB" },
    theAlignment: { type: "string", default: "left" }
  },
  description: "Give your audience a chance to prove their comprehension.",
  example: { // this wil allow us to display a priview when user hover our block after he click the + icon to add a new block to the editor

    attributes: {
      question: "What is my name?",
      correctAnswer: 3,
      answers: ['Meowsalot', 'Barksalot', 'Purrsloud', 'Brad'],
      theAlignment: "center",
      bgColor: "#CFE8F1"
    }
  },
  edit: EditComponent,
  save: function (props) {
    return null
  }
})

function EditComponent(props) { //our main Edit function:

  function updateQuestion(value) {
    props.setAttributes({ question: value })
  }

  function deleteAnswer(indexToDelete) {
    // We will create a new filtered array of answers that will contain
    // all answer but the answer we want to delete
    const newAnswers = props.attributes.answers.filter(function (x, index) {
      return index != indexToDelete
    })
    props.setAttributes({ answers: newAnswers }) // we set the answers array to our new one (see line 78...)

    if (indexToDelete == props.attributes.correctAnswer) {
      //if the user deleted the correct answer -  we also update the "correctAnswer" attribute to "undefined" so the user can try and chose another answer 
      props.setAttributes({ correctAnswer: undefined })
    }
  }

  function markAsCorrect(index) {
    // setting the "correctAnswer" attribute with the index of the correct answer so we can know what is the correct answer
    props.setAttributes({ correctAnswer: index })
  }

  return (
    <div className="paying-attention-edit-block" style={{ backgroundColor: props.attributes.bgColor }}>
      <BlockControls>
        <AlignmentToolbar value={props.attributes.theAlignment} onChange={x => props.setAttributes({ theAlignment: x })} />
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Background Color" initialOpen={true}>
          <PanelRow>
            <ChromePicker color={props.attributes.bgColor} onChangeComplete={x => props.setAttributes({ bgColor: x.hex })} disableAlpha={true} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <TextControl label="Question:" value={props.attributes.question} onChange={updateQuestion} style={{ fontSize: "20px" }} />
      <p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answers:</p>
      {props.attributes.answers.map(function (answer, index) { // we run the next code (inside "return(...)") for each answer in the array to generate answer box for our question
        return (
          <Flex>
            <FlexBlock>
              <TextControl value={answer} onChange={newValue => {
                const newAnswers = props.attributes.answers.concat([]) // Using ".concat()" we create a new empty array of answers - "concat([])"
                newAnswers[index] = newValue // we add the answer new value to the relevant index in our new updated array 
                props.setAttributes({ answers: newAnswers }) // we update the answers array with the new, updated  answer array
              }} />
            </FlexBlock>
            <FlexItem>
              <Button onClick={() => markAsCorrect(index)}>
                <Icon className="mark-as-correct" icon={props.attributes.correctAnswer == index ? "star-filled" : "star-empty"} />
              </Button>
            </FlexItem>
            <FlexItem>
              <Button isLink className="attention-delete" onClick={() => deleteAnswer(index)}>Delete</Button>
            </FlexItem>
          </Flex>
        )
      })}
      <Button isPrimary onClick={() => {
        props.setAttributes({ answers: props.attributes.answers.concat([""]) }) // we careate a new coppy of our array with an empty answer to be filed later by the user
      }}>Add another answer</Button>
    </div>
  )
}