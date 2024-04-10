import { resolve } from 'node:path'
import { describe, it } from 'vitest'
import { createContext } from '../src/core/ctx'

const root = resolve(__dirname, '../examples/vite-react')

describe('search', () => {
  it('should dir work', async () => {
    const ctx = createContext({
      dts: false,
      dirs: [
        'src/views',
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('PageA')
    expect(data).toContain('PageB')
    expect(data).toContain('pageAStories')
  })

  it('should dir excude work', async () => {
    const ctx = createContext({
      dts: false,
      dirs: [
        'src/**',
        '!src/views',
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).not.toContain('PageA')
    expect(data).not.toContain('PageB')
  })

  it('should exclude work', async () => {
    const ctx = createContext({
      dts: false,
      dirs: [
        'src/**',
      ],
      exclude: [
        /\.stories\.[jt]sx?$/
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).not.toContain('pageAStories')
  })
})
