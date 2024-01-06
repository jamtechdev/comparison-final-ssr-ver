import GuidePage from './GuidePage';
import {arrangeProducts} from "@/_helpers"
export default function PageSwitch({ PageType, slug, pageData }) {
  let PageToRender;
  switch (PageType) {
    case 'Guide':
      PageToRender = <GuidePage slug={slug} guideData={pageData}/>;
      break;
    default:
      PageToRender = () => <div>No Page Found</div>;
      break;
  }

  return PageToRender;
}
