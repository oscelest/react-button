import {Button} from "../src";

function IndexPage() {
  return (
    <div style={{display: "flex", gridRowGap: "10px", flexFlow: "column", width: "100%", height: "500px"}}>
      <Button icon={"\\1F5F8"} disabled={true}>Hello World</Button>
      <Button icon={"\\1F5F8"}>Hello World</Button>
    </div>
  );
}

export default IndexPage;
