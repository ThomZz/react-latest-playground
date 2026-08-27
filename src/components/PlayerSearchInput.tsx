import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from './PlayerSearchInput.module.css';

type PlayerSearchInputProps = {
  onSearch: (query: string) => void;
};

export default function PlayerSearchInput({ onSearch }: PlayerSearchInputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  function handleSearch() {
    if (inputValue.length >= 3) {
      onSearch(inputValue);
      setInputValue('');
    }
  }

  return (
    <div className={styles.container}>
      <TextField
        className={styles.input}
        id="outlined-basic"
        variant="outlined"
        placeholder="Search player"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <IconButton disabled={!!(inputValue.length < 3)} onClick={handleSearch} color="primary" aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
}
