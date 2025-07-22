import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AudioFileTranscribe from '../AudioFileTranscribe.vue';

describe('AudioFileTranscribe', () => {
  let wrapper: ReturnType<typeof mount>;
  beforeEach(() => {
    wrapper = mount(AudioFileTranscribe);
  });
  it('accepts audio files and displays file details', async () => {
    const file = new File(['a'.repeat(1024 * 1024 * 5)], 'test-audio.mp3', {
      type: 'audio/mp3',
    }); // 5MB

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
    });
    await input.trigger('change');

    expect(wrapper.text()).toContain('Selected File: test-audio.mp3');
    expect(wrapper.text()).toContain('File Size: 5.00 MB');
  });

  it('rejects files larger than 30MB and shows an error', async () => {
    const file = new File(['a'.repeat(1024 * 1024 * 25)], 'large-audio.mp3', {
      type: 'audio/mp3',
    }); // 25MB

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
    });
    await input.trigger('change');

    expect(wrapper.text()).toContain('El archivo no puede ser mayor a 20 MB.');
  });

  it('disables the Transcribe button when no valid file is selected', async () => {
    const transcribeButton = wrapper.find('button[type="submit"]');
    expect(transcribeButton.attributes('disabled')).toBeDefined();

    const file = new File(['a'.repeat(1024 * 1024 * 5)], 'test-audio.mp3', {
      type: 'audio/mp3',
    }); // 5MB
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: [file],
    });
    await input.trigger('change');

    expect(transcribeButton.attributes('disabled')).toBeUndefined();
  });
});
