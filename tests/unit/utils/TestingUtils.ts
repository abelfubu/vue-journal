import { Wrapper } from '@vue/test-utils';

export class TestingUtils {
  static findBySelector<T extends Vue>(
    wrapper: Wrapper<T>,
    selector: string,
  ): Wrapper<T> {
    return wrapper.find(`[data-test="${selector}"]`) as Wrapper<T>;
  }
}
