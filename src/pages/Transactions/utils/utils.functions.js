const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });

  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export const exportTrnxsToCsv = (data) => {
  const headers = ['Amount,Type,Description,Date,Balance Before,Balance After'];

  const trnxsCsv = data.reduce((acc, trnx) => {
    const {
      amount,
      type,
      description,
      createdAt,
      balanceBefore,
      balanceAfter,
    } = trnx;

    const date = new Date(createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    acc.push(
      [
        Math.abs(amount),
        type,
        description,
        date,
        balanceBefore,
        balanceAfter,
      ].join(',')
    );
    return acc;
  }, []);

  downloadFile({
    data: [...headers, ...trnxsCsv].join('\n'),
    fileName: 'Transactions.csv',
    fileType: 'text/csv',
  });
};
