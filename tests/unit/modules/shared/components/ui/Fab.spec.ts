import { shallowMount, Wrapper } from '@vue/test-utils';
import Fab from '@/modules/shared/components/ui/Fab.vue';
import { FabType } from '@/models';
import { TestingUtils } from '../../../../../../tests/unit/utils/TestingUtils';

describe('HelloWorld.vue', () => {
  let wrapper: Wrapper<Fab>;
  beforeEach(() => {
    wrapper = shallowMount(Fab);
  });

  it('renders fab with add icon', async () => {
    await FabTestingUtils.assertIcon({
      wrapper,
      iconType: FabType.ADD,
      selector: 'add-icon',
    });
  });

  it('renders fab with delete icon', async () => {
    await FabTestingUtils.assertIcon({
      wrapper,
      iconType: FabType.DELETE,
      selector: 'delete-icon',
    });
  });

  it('renders fab with update icon', async () => {
    await FabTestingUtils.assertIcon({
      wrapper,
      iconType: FabType.UPLOAD,
      selector: 'upload-icon',
    });
  });

  it('renders fab with edit icon', async () => {
    await FabTestingUtils.assertIcon({
      wrapper,
      iconType: FabType.EDIT,
      selector: 'edit-icon',
    });
  });
});

interface AssertIconParams<T extends Vue> {
  wrapper: Wrapper<T>;
  iconType: FabType;
  selector: string;
}

class FabTestingUtils {
  static async assertIcon<T extends Vue>({
    wrapper,
    iconType,
    selector,
  }: AssertIconParams<T>) {
    await wrapper.setProps({ type: iconType });
    await wrapper.vm.$nextTick();
    expect(wrapper.props('type')).toBe(iconType);
    const icon = TestingUtils.findBySelector(wrapper, selector);
    expect(icon.exists()).toBe(true);
  }
}
