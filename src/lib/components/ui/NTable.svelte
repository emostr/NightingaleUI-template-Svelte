<script>
  import { cn } from '$lib/cn'

  let { columns = [], rows = [], hover = true, cell } = $props()

  const alignClass = (a) => (a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : '')
</script>

<div class="w-full overflow-x-auto border border-line bg-surface">
  <table class="w-full text-sm border-collapse">
    <thead>
      <tr class="border-b border-line">
        {#each columns as col (col.key)}
          <th
            class={cn('ng-label text-muted text-left px-4 py-3 whitespace-nowrap', alignClass(col.align))}
            style={col.width ? `width: ${col.width}` : ''}
          >
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i (row.id ?? i)}
        <tr class={cn('border-b border-line last:border-0 transition-colors', hover ? 'hover:bg-surface-2' : '')}>
          {#each columns as col (col.key)}
            <td class={cn('px-4 py-3 text-ink align-middle', alignClass(col.align))}>
              {#if cell}{@render cell(row, col.key)}{:else}{row[col.key]}{/if}
            </td>
          {/each}
        </tr>
      {/each}
      {#if !rows.length}
        <tr>
          <td colspan={columns.length} class="px-4 py-10 text-center text-muted text-sm">Нет данных</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
