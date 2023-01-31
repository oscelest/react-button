import {Button} from "../src";

function IndexPage() {
  return (
    <div style={{display: "flex", gridRowGap: "10px", flexFlow: "column", width: "100%", height: "500px"}}>
      <Button disabled={true} value={"Hello"} onSubmit={onSubmit}>Hello World</Button>
      <Button value={"World"} onSubmit={onSubmit}>Hello World</Button>
    </div>
  );
  
  function onSubmit(value: any) {
    console.log(value);
  }
}

export default IndexPage;
